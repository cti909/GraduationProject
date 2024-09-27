using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Province;

namespace AgriSystem.Service.Interfaces
{
    public interface IProvinceService
    {
        Task<List<Province>> GetAllProvincesAsync();
        Task<bool> CreateProvincesFromJsonAsync(ProvinceData provinceData);
    }
}
