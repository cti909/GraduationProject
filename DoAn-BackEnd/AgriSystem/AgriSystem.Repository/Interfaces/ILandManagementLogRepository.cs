using AgriSystem.Data.Entities;

namespace AgriSystem.Repository.Interfaces
{
    public interface ILandManagementLogRepository
    {
        Task<List<LandManagementLog>?> GetAllLandManagementLogsDetailAsync(Guid? PlantId, Guid LandManagementId, Guid CustomerId);
        Task<LandManagementLog?> GetLandManagementLogsByIdAsync(Guid Id);
        Task<int> CreateListLandManagementLogAsync(List<LandManagementLog> entity);
        Task<int> UpdateLandManagementLogAsync(LandManagementLog entity);
    }
}
