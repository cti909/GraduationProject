using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class RecommendPlantRepository : IRecommendPlantRepository
    {
        private readonly AgriSystemContext _context;
        public RecommendPlantRepository(AgriSystemContext context)
        {
            _context = context;
        }

        public async Task<List<RecommendPlant>?> GetAllRecommendPlantAsync(Guid subscribeId)
        {
            return await _context.RecommendPlants
                .Include(entity => entity.Plant)
                .Where(x => x.SubscribeId == subscribeId)
                .Select(u => new RecommendPlant
                {
                    Id = u.Id,
                    SubscribeId = u.SubscribeId,
                    PlantId = u.PlantId,
                    CreatedAt = u.CreatedAt,
                    Plant = new Plant
                    {
                        Id = u.Plant.Id,
                        Name = u.Plant.Name,
                        GrowthTimeDay = u.Plant.GrowthTimeDay,
                        Description = u.Plant.Description,
                        IsPerennialTree = u.Plant.IsPerennialTree,
                        Photos = u.Plant.Photos,
                        IsDeleted = u.Plant.IsDeleted,
                        CreatedAt = u.Plant.CreatedAt,
                        UpdatedAt = u.Plant.UpdatedAt,
                    }

                })
                .ToListAsync();
        }

        public async Task<int> CreateRecommendPlantAsync(RecommendPlant entity)
        {
            await _context.RecommendPlants!.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }
    }
}
