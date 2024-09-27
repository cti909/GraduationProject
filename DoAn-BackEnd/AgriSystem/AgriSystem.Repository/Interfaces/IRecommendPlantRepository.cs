using AgriSystem.Data.Entities;

namespace AgriSystem.Repository.Interfaces
{
    public interface IRecommendPlantRepository
    {
        Task<List<RecommendPlant>?> GetAllRecommendPlantAsync(Guid subscribeId);
        Task<int> CreateRecommendPlantAsync(RecommendPlant entity);
    }
}
