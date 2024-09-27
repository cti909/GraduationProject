using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface ILandRepository
    {
        Task<MappingPaginationResponse<Land>?> GetAllLandsAsync(MappingPaginationRequest paginationRequest);
        Task<Land?> GetLandByIdAsync(Guid id);
        Task<List<Land>?> GetLandsByNameAsync(string name);
        Task<int> CreateLandAsync(Land entity);
        Task<int> UpdateLandAsync(Land entity);
        Task<int> DeleteLandAsync(Land entity);
    }
}
