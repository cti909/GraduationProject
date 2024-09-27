using AgriSystem.Data.Entities;

namespace AgriSystem.Repository.Interfaces
{
    public interface IProvinceRepository
    {
        Task<List<Province>?> GetAllProvincesAsync();
        Task<int> CreateListProvinceAsync(List<Province> entity);
    }
}
