using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;

namespace AgriSystem.Service.Interfaces
{
    public interface ILandManagementService
    {
        Task<List<LandManagement>?> GetAllLandManagementsByUserIdAsync(Guid userId);
        Task<LandManagement?> GetLandManagementByIdAsync(Guid id);
        Task<PaginationResponse<LandManagement>?> GetAllLandManagementsPendingAsync(PaginationRequest paginationRequest);
        Task<LandManagement?> UpdateLandManagementStatusAsync(Guid id, int status);
        Task<LandManagement?> UpdateLandManagementFinishPlantAsync(Guid id);
        //Task<bool> CreateLandManagementAsync(CreateLandManagementRequest newLandManagement);
        //Task<bool> UpdateLandManagementAsync(Guid LandManagementId, UpdateLandManagementRequest editLandManagement);
        //Task<bool> DeleteLandManagementAsync(Guid LandManagementId);
    }
}
