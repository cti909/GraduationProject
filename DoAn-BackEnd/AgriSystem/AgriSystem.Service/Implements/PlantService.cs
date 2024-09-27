using AgriSystem.Common.Configs;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Plant;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class PlantService : IPlantService
    {
        private readonly IPlantRepository _plantRepository;
        private readonly IMapper _mapper;

        public PlantService(IPlantRepository plantRepository, IMapper mapper)
        {
            _plantRepository = plantRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<Plant>?> GetAllPlantsAsync(PlantPaginationRequest paginationRequest)
        {
            var plantPagination = _mapper.Map<MappingPlantPaginationRequest>(paginationRequest);
            if (string.IsNullOrEmpty(plantPagination.SearchValue)) plantPagination.SearchValue = "";

            var plants = await _plantRepository.GetAllPlantsAsync(plantPagination);
            if (plants is null)
            {
                throw new Exception("Không có cây trồng nào");
            }

            var response = new PaginationResponse<Plant>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = plants.TotalCount,
                Data = plants.Data
            };

            return response;
        }

        public async Task<List<Plant>?> GetAllPlantPerennialBasicAsync()
        {
            var plants = await _plantRepository.GetAllPlantPerennialBasicAsync();
            if (plants is null)
            {
                throw new Exception("Không tìm thấy cây trồng");
            }

            return plants;
        }

        public async Task<Plant?> GetPlantByIdAsync(Guid id)
        {
            var plant = await _plantRepository.GetPlantByIdAsync(id);
            if (plant is null)
            {
                throw new Exception("Không tìm thấy cây trồng");
            }

            return plant;
        }

        public async Task<PaginationResponse<Plant>?> GetPlantsByListNameAsync(List<string> names)
        {
            var plants = await _plantRepository.GetPlantsByListNameAsync(names);
            if (plants is null)
            {
                throw new Exception("Không tìm thấy cây trồng");
            }

            var response = new PaginationResponse<Plant>
            {
                PageIndex = 1,
                PageSize = 4,
                TotalCount = plants.TotalCount,
                Data = plants.Data
            };
            return response;
        }

        public async Task<bool> CreatePlantAsync(CreatePlantRequest newPlant)
        {
            var plant = _mapper.Map<Plant>(newPlant);
            plant.Id = Guid.NewGuid();
            //Plant.Status = (int)PlantStatus.Process;

            // check ton tai

            string photoUploaded = null!;
            if (newPlant.Photos != null && newPlant.Photos.Count > 0)
            {
                photoUploaded = UploadHelper.UploadFiles(newPlant.Photos, "Plant", 1, Constants.ALLOWED_EXTENSIONS_IMAGE).FirstOrDefault() ?? null!;
            }
            plant.Photos = photoUploaded;

            var result = await _plantRepository.CreatePlantAsync(plant);

            if (result == 0)
            {
                throw new Exception("Tạo cây trồng thất bại");
            }

            return result > 0;
        }

        //public async Task<PaginationResponse<Plant>?> GetAllNonPerennialPlantsAsync(PaginationRequest paginationRequest)
        //{
        //    var plantPagination = _mapper.Map<MappingPaginationRequest>(paginationRequest);
        //    if (string.IsNullOrEmpty(plantPagination.SearchValue)) plantPagination.SearchValue = "";

        //    var plants = await _plantRepository.GetAllNonPerennialPlantsAsync(plantPagination);
        //    if (plants is null)
        //    {
        //        throw new Exception("Không có cây trồng nào");
        //    }

        //    var response = new PaginationResponse<Plant>
        //    {
        //        PageIndex = paginationRequest.Page,
        //        PageSize = paginationRequest.PageSize,
        //        TotalCount = plants.TotalCount,
        //        Data = plants.Data
        //    };

        //    return response;
        //}

        //public async Task<bool> UpdatePlantAsync(Guid plantId, UpdatePlantRequest editPlant)
        //{
        //    //    // kiểm tra người dùng hiện tại có phải là tác giả của cây trồng không-------

        //    //var userNameCurrent = _httpContextAccessor.HttpContext!.Items["UserName"]?.ToString() ?? null!;
        //    //var currentUser = _userRepository.GetUserByUserNameAsync(userNameCurrent);
        //    //var authorId = int.Parse(editPlant.Author!.Id);

        //    //if (authorId != currentUser.Id)
        //    //{
        //    //    throw new Exception("Bạn không có quyền cập nhật cây trồng này");
        //    //}

        //    var entity = await _plantRepository.GetPlantByIdAsync(plantId);


        //    if (entity != null)
        //    {
        //        var properties = typeof(UpdatePlantRequest).GetProperties();
        //        foreach (var property in properties)
        //        {
        //            var newValue = property.GetValue(editPlant);
        //            if (newValue != null)
        //            {
        //                var entityProperty = entity.GetType().GetProperty(property.Name);
        //                entityProperty.SetValue(entity, newValue);
        //            }
        //        }
        //    }

        //    entity.UpdatedAt = DateTime.Now;

        //    var result = await _plantRepository.UpdatePlantAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Cập nhật cây trồng thất bại");
        //    }
        //    return result > 0;
        //}

        //public async Task<bool> DeletePlantAsync(Guid id)
        //{
        //    //    // kiểm tra người dùng hiện tại có phải là tác giả của cây trồng không
        //    //    var userNameCurrent = _httpContextAccessor.HttpContext!.Items["UserName"]?.ToString() ?? null!;
        //    //    var currentUser = await _userRepository.GetUserByUserNameAsync(userNameCurrent);
        //    //    if (currentUser is null)
        //    //    {
        //    //        throw new Exception("Không tìm thấy người tạo cây trồng");
        //    //    }
        //    //    var authorId = deletePlant.Author!.Id;

        //    //    if (authorId != currentUser.Id)
        //    //    {
        //    //        throw new Exception("Bạn không có quyền xoá cây trồng này");
        //    //    }

        //    var entity = await _plantRepository.GetPlantByIdAsync(id);

        //    if (entity == null)
        //    {
        //        throw new Exception("Cây trồng không tồn tại");
        //    }

        //    entity.IsDeleted = true;
        //    entity.UpdatedAt = DateTime.Now;
        //    var result = await _plantRepository.UpdatePlantAsync(entity);

        //    if (result == 0)
        //    {
        //        throw new Exception("Xóa cây trồng thất bại");
        //    }
        //    return result > 0;
        //}
    }
}
