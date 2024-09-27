using AgriSystem.Common.Configs;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.PlantDisease;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class PlantDiseaseService : IPlantDiseaseService
    {
        private readonly IMapper _mapper;
        private readonly IPlantDiseaseRepository _plantDiseaseRepository;

        public PlantDiseaseService(IPlantDiseaseRepository plantDiseaseRepository, IMapper mapper)
        {
            _mapper = mapper;
            _plantDiseaseRepository = plantDiseaseRepository;
        }


        public async Task<bool> CreatePlantDiseaseAsync(CreatePlantDiseaseRequest newPlantDisease, PredictResponse predictResponse)
        {
            var plantDisease = _mapper.Map<PlantDisease>(newPlantDisease);
            plantDisease.Id = Guid.NewGuid();
            plantDisease.Name = predictResponse.PredictMessage;

            string photoUploaded = null!;
            if (newPlantDisease.Photos != null && newPlantDisease.Photos.Count > 0)
            {
                photoUploaded = UploadHelper.UploadFiles(newPlantDisease.Photos, "PlantDisease", 1, Constants.ALLOWED_EXTENSIONS_IMAGE).FirstOrDefault() ?? null!;
            }

            plantDisease.Photo = photoUploaded;

            var result = await _plantDiseaseRepository.CreatePlantDiseaseAsync(plantDisease);

            if (result == 0)
            {
                throw new Exception("Tạo thất bại");
            }

            return true;
        }

        public async Task<PaginationResponse<PlantDisease>?> GetAllPlantDiseasesAsync(PaginationTableRequest paginationRequest)
        {

            var plantDiseasePagination = _mapper.Map<MappingPaginationTableRequest>(paginationRequest);

            var plantDiseases = await _plantDiseaseRepository.GetAllPlantDiseasesAsync(plantDiseasePagination);
            if (plantDiseases is null)
            {
                throw new Exception("Không có thông tin nào");
            }

            var response = new PaginationResponse<PlantDisease>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = plantDiseases.TotalCount,
                Data = plantDiseases.Data
            };

            return response;
        }

    }
}
