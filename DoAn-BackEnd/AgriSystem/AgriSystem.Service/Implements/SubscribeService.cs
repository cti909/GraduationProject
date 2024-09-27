using AgriSystem.Data.Entities;
using AgriSystem.Data.EnumStatus;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.LandManagement;
using AgriSystem.Service.Dtos.Subscribe;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class SubscribeService : ISubscribeService
    {
        private readonly ISubscribeRepository _subscribeRepository;
        private readonly ILandManagementRepository _landManagementRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILandManagementLogRepository _landManagementLogRepository;
        private readonly IPlantRepository _plantRepository;
        private readonly IMapper _mapper;

        public SubscribeService(
            ISubscribeRepository subscribeRepository,
            ILandManagementRepository landManagementRepository,
            IUserRepository userRepository,
            ILandManagementLogRepository landManagementLogRepository,
            IPlantRepository plantRepository,
            IMapper mapper)
        {
            _mapper = mapper;
            _subscribeRepository = subscribeRepository;
            _landManagementRepository = landManagementRepository;
            _userRepository = userRepository;
            _landManagementLogRepository = landManagementLogRepository;
            _plantRepository = plantRepository;
        }

        /// <summary>
        /// Get all Subscribe by user
        /// </summary>
        public async Task<PaginationResponse<Subscribe>> GetAllSubscribesByUserIdAsync(PaginationTableRequest paginationRequest)
        {
            var subscribePagination = _mapper.Map<MappingPaginationTableRequest>(paginationRequest);

            var subscribes = await _subscribeRepository.GetAllSubscribesByUserIdAsync(subscribePagination);
            if (subscribes is null)
            {
                throw new Exception("Không có đơn hàng nào");
            }
            var response = new PaginationResponse<Subscribe>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = subscribes.TotalCount,
                Data = subscribes.Data
            };

            return response;
        }

        /// <summary>
        /// Get Subscribe by id
        /// </summary>
        public async Task<Subscribe?> GetSubscribeByIdAsync(Guid id)
        {
            var Subscribe = await _subscribeRepository.GetSubscribeByIdAsync(id);
            if (Subscribe is null)
            {
                throw new Exception("Không tìm thấy đơn hàng");
            }
            return Subscribe;
        }

        /// <summary>
        /// Create new Subscribe
        /// </summary>
        public async Task<bool> CreateSubscribeAsync(CreateSubscribeRequest newSubscribe)
        {
            // check money
            var customer = await _userRepository.GetUserByIdAsync(newSubscribe.UserId);
            if (customer.AccountBalance < newSubscribe.TotalPrice)
            {
                throw new Exception("Tiền trong tài khoản không đủ");
            }

            // create subscribe
            var subscribe = _mapper.Map<Subscribe>(newSubscribe);
            subscribe.Id = Guid.NewGuid();
            subscribe.RentedEndTime = subscribe.CreatedAt.AddMonths(subscribe.DurationTime);
            var result1 = await _subscribeRepository.CreateSubscribeAsync(subscribe);

            // create land management
            var landManagement = await _landManagementRepository.GetLandManagementByIdBasicAsync(newSubscribe.LandManagementId);
            if (landManagement == null)
            {
                throw new Exception("Không tồn tại quản lý đất tương ứng");
            }
            landManagement.IsRented = true;
            var result2 = await _landManagementRepository.UpdateLandManagementAsync(landManagement);

            // update money user
            var farmer = await _userRepository.GetUserByIdAsync(landManagement.UserId);
            customer.AccountBalance -= newSubscribe.TotalPrice;
            farmer.AccountBalance += newSubscribe.TotalPrice;
            var result3 = await _userRepository.UpdateUserAsync(customer);
            var result4 = await _userRepository.UpdateUserAsync(farmer);

            if (result1 == 0 ||  result2 == 0 || result3 == 0 || result4 == 0)
            {
                throw new Exception("Đã có lỗi, thuê thất bại");
            }

            return result1 > 0;
        }

        /// <summary>
        /// Update Subscribe Plant, plant tree in Land 
        /// </summary>
        public async Task<bool> UpdateSubscribePlantAsync(UpdateSubscribePlantRequest newSubscribe)
        {
            var plant = await _plantRepository.GetPlantByIdAsync(newSubscribe.PlantId);
            var subscribe = await _subscribeRepository.GetSubscribeByIdAsync(newSubscribe.SubscribeId);
            if (subscribe == null)
            {
                throw new Exception("Không tìm thấy đơn hàng");
            }
            //if (subscribe.Status == 1)
            //{
            //    throw new Exception("Đơn hãng đang thư viện");
            //}
            if (subscribe.RentedEndTime < DateTime.Now.AddDays((double)plant.GrowthTimeDay))
            {
                throw new Exception("Cây trồng có thời gian trưởng thành vượt quá thời gian thuê đất");
            }

            var landManagement = await _landManagementRepository.GetLandManagementByIdBasicAsync(newSubscribe.LandManagementId);
            landManagement.PlantId = newSubscribe.PlantId;
            var result = await _landManagementRepository.UpdateLandManagementAsync(landManagement);

            List<string> stagesPlantGrowth = [
                "Gieo trồng hạt giống",
                "Giai đoạn nảy mầm",
                "Giai đoạn cây non",
                "Giai đoạn sinh trưởng sinh dưỡng",
                "Giai đoạn cây trưởng thành, ra hoa, phát triển quả, hạt",
                "Giai đoạn cây trưởng thành, ra hoa, quả, hạt",
                "Thu hoạch"
                ];

            var landManagementLogList = new List<LandManagementLog>();
            int idxSortNumber = 1;
            foreach (var stage in stagesPlantGrowth)
            {
                var landManagementLog = new LandManagementLog
                {
                    Id = Guid.NewGuid(),
                    LandManagementId = newSubscribe.LandManagementId,
                    PlantId = newSubscribe.PlantId,
                    CustomerId = newSubscribe.UserId,
                    Action = stage,
                    SortNumber = idxSortNumber,
                };
                landManagementLogList.Add(landManagementLog);
                idxSortNumber = idxSortNumber + 1;
            }
            var resultLog = await _landManagementLogRepository.CreateListLandManagementLogAsync(landManagementLogList);

            if (result == 0 || resultLog == 0)
            {
                throw new Exception("Đã có lỗi, tạo cây thất bại");
            }

            return result > 0;
        }

        public async Task<bool> CancelSubscribeAsync(CancelSubscribeRequest request)
        {
            // landManagement
            var landManagement = await _landManagementRepository.GetLandManagementByIdBasicAsync(request.LandManagementId);
            if (landManagement == null)
            {
                throw new Exception("Không tồn tại quản lý đặt tương ứng");
            }
            landManagement.IsRented = false;
            landManagement.PlantId = null;
            var result = await _landManagementRepository.UpdateLandManagementAsync(landManagement);
            if (result == 0)
            {
                throw new Exception("Cập nhật quản lý đặt thất bại");
            }

            // subscribe
            var subscribe = await _subscribeRepository.GetSubscribeByIdBasicAsync(request.SubscribeId);
            if (subscribe == null)
            {
                throw new Exception("Không tồn tại đơn tương ứng");
            }
            subscribe.Status = (int)SubscribeStatus.Ended;
            var result2 = await _subscribeRepository.UpdateSubscribeAsync(subscribe);
            if (result == 0)
            {
                throw new Exception("Cập nhật đơn thất bại");
            }

            return result > 0;
        }


        /////------------------------------------------
        //public async Task<bool> UpdateSubscribeAsync(Guid SubscribeId, UpdateSubscribeRequest editSubscribe)
        //{
        //    var entity = await _subscribeRepository.GetSubscribeByIdAsync(SubscribeId);
        //    if (entity != null)
        //    {
        //        var properties = typeof(UpdateSubscribeRequest).GetProperties();
        //        foreach (var property in properties)
        //        {
        //            var newValue = property.GetValue(editSubscribe);
        //            if (newValue != null)
        //            {
        //                var entityProperty = entity.GetType().GetProperty(property.Name);
        //                entityProperty.SetValue(entity, newValue);
        //            }
        //        }
        //    }
        //    entity.UpdatedAt = DateTime.Now;
        //    var result = await _subscribeRepository.UpdateSubscribeAsync(entity);
        //    if (result == 0)
        //    {
        //        throw new Exception("Cập nhật đơn hàng thất bại");
        //    }
        //    return result > 0;
        //}

        //public async Task<bool> DeleteSubscribeAsync(Guid id)
        //{
        //    var entity = await _subscribeRepository.GetSubscribeByIdAsync(id);
        //    if (entity == null)
        //    {
        //        throw new Exception("đơn hàng không tồn tại");
        //    }
        //    entity.IsDeleted = true;
        //    entity.UpdatedAt = DateTime.Now;
        //    var result = await _subscribeRepository.UpdateSubscribeAsync(entity);
        //    if (result == 0)
        //    {
        //        throw new Exception("Xóa đơn hàng thất bại");
        //    }
        //    return result > 0;
        //}
    }
}
