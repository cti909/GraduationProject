using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.LandManagementLog;

namespace AgriSystem.Service.Interfaces
{
    public interface ILandManagementLogService
    {
        Task<List<LandManagementLog>> GetAllLandManagementLogsDetailAsync(GetLandManagementLogRequest request);
        Task<bool> UpdateLandManagementLogAsync(UpdateLandManagementLogRequest entity);
    }
}
