using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class ProvinceRepository : IProvinceRepository
    {
        private readonly AgriSystemContext _context;
        public ProvinceRepository(AgriSystemContext context)
        {
            _context = context;
        }

        public async Task<List<Province>?> GetAllProvincesAsync()
        {
            return await _context.Provinces.ToListAsync();
        }

        public async Task<int> CreateListProvinceAsync(List<Province> entity)
        {
            await _context.Provinces.AddRangeAsync(entity);
            return await _context.SaveChangesAsync();
        }
    }
}
