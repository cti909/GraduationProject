using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class LandRepository : ILandRepository
    {
        private readonly AgriSystemContext _context;
        public LandRepository(AgriSystemContext context)
        {
            _context = context;
        }
        public async Task<MappingPaginationResponse<Land>> GetAllLandsAsync(MappingPaginationRequest paginationRequest)
        {
            var lands = await _context.Lands!
                .Where(e => e.Name.Contains(paginationRequest.SearchValue!))
                .Include(land => land.LandManagement) // Include LandManagements
                .Where(land => land.LandManagement != null && land.LandManagement.Status == 2)
                .Select(u => new Land
                {
                    Id = u.Id,
                    Name = u.Name,
                    Description = u.Description,
                    Province = u.Province,
                    Photos = u.Photos,
                    Size = u.Size,
                    N = u.N,
                    P = u.P,
                    K = u.K,
                    pH = u.pH,
                    IsDeleted = u.IsDeleted,
                    UserId = u.UserId,

                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    LandManagement =  new LandManagement
                    {
                        Id = u.LandManagement.Id,
                        //GrowthTimeMonth = u.LandManagement.GrowthTimeMonth,
                        //GrowthStatus = u.LandManagement.GrowthStatus,
                        PricePerMonth = u.LandManagement.PricePerMonth,
                        //HarvestTime = u.LandManagement.HarvestTime,
                        IsTree = u.LandManagement.IsTree,
                        IsRented = u.LandManagement.IsRented,
                        IsDeleted = u.LandManagement.IsDeleted,
                        LandId = u.LandManagement.LandId,
                        PlantId = u.LandManagement.PlantId,
                        UserId = u.LandManagement.UserId,
                        CreatedAt = u.LandManagement.CreatedAt,
                        UpdatedAt = u.LandManagement.UpdatedAt
                    },
                })
            .ToListAsync();

            var totalCount = lands.Count;

            var entityProperty = lands.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                lands = lands.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                lands = lands.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            lands = lands.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                lands = lands.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<Land>
            {
                TotalCount = totalCount,
                Data = lands
            };

            return response;
        }

        public async Task<Land?> GetLandByIdAsync(Guid id)
        {
            var land = await _context.Lands!
                .Include(land => land.User)
                .Include(land => land.LandManagement)
                .Where(x => x.Id == id)
                .Select(u => new Land
                {
                    Id = u.Id,
                    Name = u.Name,
                    Description = u.Description,
                    Province = u.Province,
                    Photos = u.Photos,
                    Size = u.Size,
                    N = u.N,
                    P = u.P,
                    K = u.K,
                    pH = u.pH,
                    IsDeleted = u.IsDeleted,
                    UserId = u.UserId,

                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    LandManagement =  new LandManagement
                    {
                        Id = u.LandManagement.Id,
                        //GrowthTimeMonth = u.LandManagement.GrowthTimeMonth,
                        //GrowthStatus = u.LandManagement.GrowthStatus,
                        PricePerMonth = u.LandManagement.PricePerMonth,
                        //HarvestTime = u.LandManagement.HarvestTime,
                        IsTree = u.LandManagement.IsTree,
                        IsRented = u.LandManagement.IsRented,
                        IsDeleted = u.LandManagement.IsDeleted,
                        LandId = u.LandManagement.LandId,
                        PlantId = u.LandManagement.PlantId,
                        UserId = u.LandManagement.UserId,
                        CreatedAt = u.LandManagement.CreatedAt,
                        UpdatedAt = u.LandManagement.UpdatedAt
                    },
                    User = new UserApp
                    {
                        Id = u.User.Id,
                        Name = u.User.Name,
                        Email = u.User.Email,
                        Role = u.User.Role,
                        PhoneNumber = u.User.PhoneNumber,
                    }
                })
                .FirstOrDefaultAsync();

            return land;
        }


        public async Task<List<Land>?> GetLandsByNameAsync(string name)
        {
            var Land = await _context.Lands!
                .Where(e => e.Name.Contains(name))
                .ToListAsync();

            return Land;
        }

        public async Task<int> CreateLandAsync(Land newLand)
        {
            await _context.Lands!.AddAsync(newLand);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateLandAsync(Land editLand)
        {
            _context.Lands!.Update(editLand);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteLandAsync(Land deleteLand)
        {
            _context.Lands!.Remove(deleteLand);
            //_context.Lands!.Update(deleteLand);
            return await _context.SaveChangesAsync();
        }
    }
}
