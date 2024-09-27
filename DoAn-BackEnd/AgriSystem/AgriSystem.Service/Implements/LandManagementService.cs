using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class LandManagementService : ILandManagementService
    {
        private readonly ILandManagementRepository _landManagementRepository;
        private readonly IMapper _mapper;

        public LandManagementService(ILandManagementRepository landManagementRepository, IMapper mapper)
        {
            _landManagementRepository = landManagementRepository;
            _mapper = mapper;
        }

        public async Task<List<LandManagement>?> GetAllLandManagementsByUserIdAsync(Guid userId)
        {
            var landManagements = await _landManagementRepository.GetAllLandManagementsByUserIdAsync(userId);
            if (landManagements is null)
            {
                throw new Exception("Không có quản lý đất nào của bạn");
            }
            return landManagements;
        }

        public async Task<LandManagement?> GetLandManagementByIdAsync(Guid id)
        {
            var LandManagement = await _landManagementRepository.GetLandManagementByIdAsync(id);
            if (LandManagement is null)
            {
                throw new Exception("Không tìm thấy quản lý đất");
            }
            return LandManagement;
        }

        /// <summary>
        /// Get All LandManagements with Status Pending
        /// </summary>
        public async Task<PaginationResponse<LandManagement>?> GetAllLandManagementsPendingAsync(PaginationRequest paginationRequest)
        {
            var landManagementPagination = _mapper.Map<MappingPaginationRequest>(paginationRequest);
            if (string.IsNullOrEmpty(landManagementPagination.SearchValue)) landManagementPagination.SearchValue = "";

            var lands = await _landManagementRepository.GetAllLandManagementsPendingAsync(landManagementPagination);
            if (lands is null)
            {
                throw new Exception("Không có bản ghi nào");
            }

            var response = new PaginationResponse<LandManagement>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = lands.TotalCount,
                Data = lands.Data
            };

            return response;
        }

        /// <summary>
        /// Update LandManagement Status
        /// </summary>
        public async Task<LandManagement?> UpdateLandManagementStatusAsync(Guid id, int status)
        {
            var landManagement = await _landManagementRepository.GetLandManagementByIdBasicAsync(id);
            if (landManagement == null)
            {
                throw new Exception("Không tồn tại quản lý đất tương ứng");
            }
            landManagement.Status = status;
            var result = await _landManagementRepository.UpdateLandManagementAsync(landManagement);
            if (result == 0)
            {
                throw new Exception("Cập nhật quản lý đất thất bại");
            }
            return landManagement;
        }

        /// <summary>
        /// Update LandManagement Finish Plant
        /// </summary>
        public async Task<LandManagement?> UpdateLandManagementFinishPlantAsync(Guid id)
        {
            var landManagement = await _landManagementRepository.GetLandManagementByIdBasicAsync(id);
            if (landManagement == null)
            {
                throw new Exception("Không tồn tại quản lý đất tương ứng");
            }
            landManagement.PlantId = null;
            var result = await _landManagementRepository.UpdateLandManagementAsync(landManagement);
            if (result == 0)
            {
                throw new Exception("Cập nhật quản lý đất thất bị");
            }
            return landManagement;
        }

        //public async Task<bool> CreateLandManagementAsync(CreateLandManagementRequest newLandManagement)
        //{
        //    var LandManagement = _mapper.Map<LandManagement>(newLandManagement);
        //    LandManagement.Id = Guid.NewGuid();
        //    //LandManagement.Status = (int)LandManagementStatus.Process;

        //    // check ton tai

        //    var result = await _landManagementRepository.CreateLandManagementAsync(LandManagement);

        //    if (result == 0)
        //    {
        //        throw new Exception("Tạo quản lý đất thất bại");
        //    }

        //    return result > 0;
        //}

        //public async Task<bool> UpdateLandManagementAsync(Guid LandManagementId, UpdateLandManagementRequest editLandManagement)
        //{
        //    var entity = await _landManagementRepository.GetLandManagementByIdAsync(LandManagementId);


        //    if (entity != null)
        //    {
        //        var properties = typeof(UpdateLandManagementRequest).GetProperties();
        //        foreach (var property in properties)
        //        {
        //            var newValue = property.GetValue(editLandManagement);
        //            if (newValue != null)
        //            {
        //                var entityProperty = entity.GetType().GetProperty(property.Name);
        //                entityProperty.SetValue(entity, newValue);
        //            }
        //        }
        //    }

        //    entity.UpdatedAt = DateTime.Now;

        //    var result = await _landManagementRepository.UpdateLandManagementAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Cập nhật quản lý đất thất bại");
        //    }
        //    return result > 0;
        //}

        //public async Task<bool> DeleteLandManagementAsync(Guid id)
        //{
        //    var entity = await _landManagementRepository.GetLandManagementByIdAsync(id);

        //    if (entity == null)
        //    {
        //        throw new Exception("quản lý đất không tồn tại");
        //    }

        //    entity.IsDeleted = true;
        //    entity.UpdatedAt = DateTime.Now;
        //    var result = await _landManagementRepository.UpdateLandManagementAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Xóa quản lý đất thất bại");
        //    }
        //    return result > 0;
        //}
    }
}
