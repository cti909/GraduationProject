using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class LandManagementLogRepository : ILandManagementLogRepository
    {
        private readonly AgriSystemContext _context;
        public LandManagementLogRepository(AgriSystemContext context)
        {
            _context = context;
        }

        public async Task<List<LandManagementLog>?> GetAllLandManagementLogsDetailAsync(Guid? PlantId, Guid LandManagementId, Guid CustomerId)
        {
            var landManagementLogs = await _context.LandManagementLogs!
                .Where(x => x.PlantId == PlantId && x.LandManagementId == LandManagementId && x.CustomerId == CustomerId)
                .OrderBy(x => x.SortNumber)
                .ToListAsync();
            return landManagementLogs;
        }

        public async Task<LandManagementLog?> GetLandManagementLogsByIdAsync(Guid Id)
        {
            var landManagementLog = await _context.LandManagementLogs!
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync();
            return landManagementLog;
        }

        public async Task<int> CreateListLandManagementLogAsync(List<LandManagementLog> entity)
        {
            await _context.LandManagementLogs.AddRangeAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateLandManagementLogAsync(LandManagementLog entity)
        {
            _context.LandManagementLogs!.Update(entity);
            return await _context.SaveChangesAsync();
        }
    }
}
