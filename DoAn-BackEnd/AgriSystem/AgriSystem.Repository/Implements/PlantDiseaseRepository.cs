using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class PlantDiseaseRepository : IPlantDiseaseRepository
    {
        private readonly AgriSystemContext _context;
        public PlantDiseaseRepository(AgriSystemContext context)
        {
            _context = context;
        }
        public async Task<MappingPaginationResponse<PlantDisease>> GetAllPlantDiseasesAsync(MappingPaginationTableRequest paginationRequest)
        {
            var plantDiseases = await _context.PlantDiseases!
                .Where(item => item.UserId == paginationRequest.UserId)
                .OrderByDescending(pd => pd.CreatedAt)
                .ToListAsync();

            var totalCount = plantDiseases.Count;

            var entityProperty = plantDiseases.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                plantDiseases = plantDiseases.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                plantDiseases = plantDiseases.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            plantDiseases = plantDiseases.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                plantDiseases = plantDiseases.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<PlantDisease>
            {
                TotalCount = totalCount,
                Data = plantDiseases
            };

            return response;
        }

        public async Task<PlantDisease?> GetPlantDiseaseByIdAsync(Guid id)
        {
            var plantDisease = await _context.PlantDiseases!
                .FirstOrDefaultAsync(x => x.Id == id);
            return plantDisease;
        }

        public async Task<List<PlantDisease>?> GetPlantDiseasesByNameAsync(string name)
        {
            var plantDisease = await _context.PlantDiseases!
                .Where(e => e.Name.Contains(name))
                .ToListAsync();

            return plantDisease;
        }

        public async Task<int> CreatePlantDiseaseAsync(PlantDisease newPlantDisease)
        {
            await _context.PlantDiseases!.AddAsync(newPlantDisease);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdatePlantDiseaseAsync(PlantDisease editPlantDisease)
        {
            _context.PlantDiseases!.Update(editPlantDisease);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeletePlantDiseaseAsync(PlantDisease deletePlantDisease)
        {
            _context.PlantDiseases!.Remove(deletePlantDisease);
            //_context.PlantDiseases!.Update(deletePlantDisease);
            return await _context.SaveChangesAsync();
        }
    }
}
