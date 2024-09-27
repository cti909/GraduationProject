using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface ILandManagementRepository
    {
        Task<List<LandManagement>?> GetAllLandManagementsByUserIdAsync(Guid userId);
        Task<LandManagement?> GetLandManagementByIdAsync(Guid id);
        Task<LandManagement?> GetLandManagementByIdBasicAsync(Guid id);
        Task<LandManagement?> GetLandManagementByIdWithSubscribeAsync(Guid id);
        Task<MappingPaginationResponse<LandManagement>?> GetAllLandManagementsPendingAsync(MappingPaginationRequest paginationRequest);
        Task<List<LandManagement>?> GetLandManagementsByNameAsync(string name);
        Task<int> CreateLandManagementAsync(LandManagement entity);
        Task<int> UpdateLandManagementAsync(LandManagement entity);
        Task<int> DeleteLandManagementAsync(LandManagement entity);
    }
}
