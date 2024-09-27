using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface IPlantDiseaseRepository
    {
        Task<MappingPaginationResponse<PlantDisease>?> GetAllPlantDiseasesAsync(MappingPaginationTableRequest paginationRequest);
        Task<PlantDisease?> GetPlantDiseaseByIdAsync(Guid id);
        Task<List<PlantDisease>?> GetPlantDiseasesByNameAsync(string name);
        Task<int> CreatePlantDiseaseAsync(PlantDisease entity);
        Task<int> UpdatePlantDiseaseAsync(PlantDisease entity);
        Task<int> DeletePlantDiseaseAsync(PlantDisease entity);
    }
}
