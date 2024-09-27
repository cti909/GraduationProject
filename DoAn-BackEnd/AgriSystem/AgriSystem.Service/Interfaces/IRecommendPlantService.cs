using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.RecommendPlant;

namespace AgriSystem.Service.Interfaces
{
    public interface IRecommendPlantService
    {
        Task<List<RecommendPlant>> GetAllRecommendPlantAsync(GetAllRecommendPlantRequest request);
        Task<bool> CreateRecommendPlantAsync(CreateRecommendPlantRequest request);
    }
}
