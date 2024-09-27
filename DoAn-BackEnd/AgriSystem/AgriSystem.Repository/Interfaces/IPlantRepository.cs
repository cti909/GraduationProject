using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface IPlantRepository
    {
        Task<MappingPaginationResponse<Plant>?> GetAllPlantsAsync(MappingPlantPaginationRequest paginationRequest);
        Task<MappingPaginationResponse<Plant>?> GetPlantsByListNameAsync(List<string> names);
        //Task<MappingPaginationResponse<Plant>?> GetAllNonPerennialPlantsAsync(MappingPaginationRequest paginationRequest);
        Task<List<Plant>?> GetAllPlantPerennialBasicAsync();
        Task<Plant?> GetPlantByIdAsync(Guid id);
        Task<int> CreatePlantAsync(Plant entity);
        Task<int> UpdatePlantAsync(Plant entity);
        Task<int> DeletePlantAsync(Plant entity);
    }
}
