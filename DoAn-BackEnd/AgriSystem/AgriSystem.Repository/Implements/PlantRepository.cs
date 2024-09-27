using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class PlantRepository : IPlantRepository
    {
        private readonly AgriSystemContext _context;
        public PlantRepository(AgriSystemContext context)
        {
            _context = context;
        }

        public async Task<MappingPaginationResponse<Plant>?> GetAllPlantsAsync(MappingPlantPaginationRequest paginationRequest)
        {
            var plants = await _context.Plants!
                .Where(e => e.Name.Contains(paginationRequest.SearchValue!))
                .ToListAsync();

            if (paginationRequest.IsPerennialTree == true)
            {
                plants = plants
                    .Where(e => e.IsPerennialTree == true)
                    .ToList();
            }

            if (paginationRequest.IsPerennialTree == false)
            {
                plants = plants
                    .Where(e => e.IsPerennialTree == false)
                    .ToList();
            }

            var totalCount = plants.Count;

            var entityProperty = plants.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                plants = plants.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                plants = plants.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }

            plants = plants.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                plants = plants.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<Plant>
            {
                TotalCount = totalCount,
                Data = plants
            };

            return response;
        }

        public async Task<MappingPaginationResponse<Plant>?> GetAllNonPerennialPlantsAsync(MappingPaginationRequest paginationRequest)
        {
            var plants = await _context.Plants!
                .Where(e => e.Name.Contains(paginationRequest.SearchValue!))
                .Where(e => e.IsPerennialTree == false)
                .ToListAsync();

            var totalCount = plants.Count;

            var entityProperty = plants.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                plants = plants.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                plants = plants.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }

            plants = plants.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                plants = plants.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<Plant>
            {
                TotalCount = totalCount,
                Data = plants
            };

            return response;
        }

        public async Task<List<Plant>?> GetAllPlantPerennialBasicAsync()
        {
            var plants = await _context.Plants!
                .Where(x => x.IsPerennialTree == true)
                .ToListAsync();
            return plants;
        }

        public async Task<Plant?> GetPlantByIdAsync(Guid id)
        {
            var plant = await _context.Plants!
                .FirstOrDefaultAsync(x => x.Id == id);
            return plant;
        }

        public async Task<MappingPaginationResponse<Plant>?> GetPlantsByListNameAsync(List<string> names)
        {
            var plants = await _context.Plants!
                .Where(e => names.Select(name => name.ToLower()).Contains(e.Name.ToLower()))
                .ToListAsync();

            // Sắp xếp lại danh sách plants theo thứ tự của names
            var orderedPlants = names
                .Select(name => plants.FirstOrDefault(plant => plant.Name.ToLower() == name.ToLower()))
                .Where(plant => plant != null)
                .ToList();

            var totalCount = orderedPlants.Count;

            var response = new MappingPaginationResponse<Plant>
            {
                TotalCount = totalCount,
                Data = orderedPlants
            };

            return response;
        }

        public async Task<int> CreatePlantAsync(Plant newPlant)
        {
            await _context.Plants!.AddAsync(newPlant);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdatePlantAsync(Plant editPlant)
        {
            _context.Plants!.Update(editPlant);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeletePlantAsync(Plant deletePlant)
        {
            _context.Plants!.Remove(deletePlant);
            //_context.Plants!.Update(deletePlant);
            return await _context.SaveChangesAsync();
        }
    }
}
