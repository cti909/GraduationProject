using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Plant;

namespace AgriSystem.Service.Interfaces
{
    public interface IPlantService
    {
        Task<PaginationResponse<Plant>?> GetAllPlantsAsync(PlantPaginationRequest paginationRequest);
        //Task<PaginationResponse<Plant>?> GetAllNonPerennialPlantsAsync(PaginationRequest paginationRequest);
        Task<List<Plant>?> GetAllPlantPerennialBasicAsync();
        Task<Plant?> GetPlantByIdAsync(Guid id);
        Task<PaginationResponse<Plant>?> GetPlantsByListNameAsync(List<string> names);
        Task<bool> CreatePlantAsync(CreatePlantRequest newPlant);
        //Task<bool> UpdatePlantAsync(Guid plantId, UpdatePlantRequest editPlant);
        //Task<bool> DeletePlantAsync(Guid plantId);
    }
}
