using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Land;

namespace AgriSystem.Service.Interfaces
{
    public interface ILandService
    {
        Task<PaginationResponse<Land>?> GetAllLandsAsync(PaginationRequest paginationRequest);
        Task<Land?> GetLandByIdAsync(Guid id);
        Task<bool> CreateLandAsync(CreateLandRequest newLand);
        //Task<List<Land>?> GetLandsByNameAsync(string name);
        //Task<bool> UpdateLandAsync(Guid LandId, UpdateLandRequest editLand);
        //Task<bool> DeleteLandAsync(Guid LandId);
    }
}
