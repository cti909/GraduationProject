using AgriSystem.Common.Configs;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Land;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class LandService : ILandService
    {
        private readonly ILandRepository _landRepository;
        private readonly IMapper _mapper;
        private readonly ILandManagementRepository _landManagementRepository;

        public LandService(ILandRepository landRepository, ILandManagementRepository landManagementRepository, IMapper mapper)
        {
            _landRepository = landRepository;
            _mapper = mapper;
            _landManagementRepository = landManagementRepository;
        }

        public async Task<PaginationResponse<Land>?> GetAllLandsAsync(PaginationRequest paginationRequest)
        {
            var plantPagination = _mapper.Map<MappingPaginationRequest>(paginationRequest);
            if (string.IsNullOrEmpty(plantPagination.SearchValue)) plantPagination.SearchValue = "";

            var lands = await _landRepository.GetAllLandsAsync(plantPagination);
            if (lands is null)
            {
                throw new Exception("Không có đất nào");
            }

            var response = new PaginationResponse<Land>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = lands.TotalCount,
                Data = lands.Data
            };

            return response;
        }

        public async Task<Land?> GetLandByIdAsync(Guid id)
        {
            var Land = await _landRepository.GetLandByIdAsync(id);
            if (Land is null)
            {
                throw new Exception("Không tìm thấy đất");
            }
            return Land;
        }

        // create land and land management
        public async Task<bool> CreateLandAsync(CreateLandRequest newLand)
        {
            var land = new Land
            {
                Id = Guid.NewGuid(),
                Name = newLand.Name,
                Description = newLand.Description,
                Province = newLand.Province,
                Size = newLand.Size,
                N = newLand.N,
                P = newLand.P,
                K = newLand.K,
                pH = newLand.pH,
                UserId = newLand.UserId
            };

            //var land = _mapper.Map<Land>(newLand);
            //land.Id = Guid.NewGuid();

            string photoUploaded = null!;
            if (newLand.Photos != null && newLand.Photos.Count > 0)
            {
                photoUploaded = UploadHelper.UploadFiles(newLand.Photos, "Land", 1, Constants.ALLOWED_EXTENSIONS_IMAGE).FirstOrDefault() ?? null!;
            }
            land.Photos = photoUploaded;

            var result = await _landRepository.CreateLandAsync(land);

            // create land management
            var landManagement = new LandManagement
            {
                Id = Guid.NewGuid(),
                LandId = land.Id,
                PricePerMonth = newLand.PricePerMonth,
                IsTree = newLand.IsTree,
                PlantId = newLand.PlantId,
                HarvestMonthTime = newLand.HarvestMonthTime,
                UserId = newLand.UserId
            };
            var result2 = await _landManagementRepository.CreateLandManagementAsync(landManagement);

            if (result == 0)
            {
                throw new Exception("Tạo đất thất bại");
            }

            if (result2 == 0)
            {
                throw new Exception("Tạo quản lý đất thất bại");
            }

            return result > 0;
        }

        //public Task<List<Land>?> GetLandsByNameAsync(string name)
        //{
        //    var Land = _landRepository.GetLandsByNameAsync(name);
        //    if (Land is null)
        //    {
        //        throw new Exception("Không tìm thấy đất");
        //    }
        //    return Land;
        //}

        //public async Task<bool> UpdateLandAsync(Guid LandId, UpdateLandRequest editLand)
        //{
        //    var entity = await _landRepository.GetLandByIdAsync(LandId);


        //    if (entity != null)
        //    {
        //        var properties = typeof(UpdateLandRequest).GetProperties();
        //        foreach (var property in properties)
        //        {
        //            var newValue = property.GetValue(editLand);
        //            if (newValue != null)
        //            {
        //                var entityProperty = entity.GetType().GetProperty(property.Name);
        //                entityProperty.SetValue(entity, newValue);
        //            }
        //        }
        //    }

        //    entity.UpdatedAt = DateTime.Now;

        //    var result = await _landRepository.UpdateLandAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Cập nhật đất thất bại");
        //    }
        //    return result > 0;
        //}

        //public async Task<bool> DeleteLandAsync(Guid id)
        //{
        //    var entity = await _landRepository.GetLandByIdAsync(id);

        //    if (entity == null)
        //    {
        //        throw new Exception("đất không tồn tại");
        //    }

        //    entity.IsDeleted = true;
        //    entity.UpdatedAt = DateTime.Now;
        //    var result = await _landRepository.UpdateLandAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Xóa đất thất bại");
        //    }
        //    return result > 0;
        //}
    }
}
