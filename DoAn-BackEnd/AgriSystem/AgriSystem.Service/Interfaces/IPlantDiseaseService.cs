using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.PlantDisease;

namespace AgriSystem.Service.Interfaces
{
    public interface IPlantDiseaseService
    {
        Task<bool> CreatePlantDiseaseAsync(CreatePlantDiseaseRequest plantDisease, PredictResponse predictResponse);
        Task<PaginationResponse<PlantDisease>?> GetAllPlantDiseasesAsync(PaginationTableRequest paginationRequest);
    }
}
