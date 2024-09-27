using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Data.EnumStatus;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class LandManagementRepository : ILandManagementRepository
    {
        private readonly AgriSystemContext _context;
        public LandManagementRepository(AgriSystemContext context)
        {
            _context = context;
        }
        public async Task<List<LandManagement>?> GetAllLandManagementsByUserIdAsync(Guid userId)
        {
            var landManagements = await _context.LandManagements!
                .Include(lm => lm.Land) // Include Land
                .Include(lm => lm.Plant) // Include Plant
                .Where(lm => lm.UserId == userId)
                .Include(lm => lm.Subscribes)
                .Select(lm => new LandManagement
                {
                    Id = lm.Id,
                    //GrowthTimeMonth = lm.GrowthTimeMonth,
                    //GrowthStatus = lm.GrowthStatus,
                    PricePerMonth = lm.PricePerMonth,
                    HarvestMonthTime = lm.HarvestMonthTime, //
                    Status = lm.Status, //
                    IsTree = lm.IsTree,
                    IsRented = lm.IsRented,
                    IsDeleted = lm.IsDeleted,
                    LandId = lm.LandId,
                    PlantId = lm.PlantId,
                    UserId = lm.UserId,
                    CreatedAt = lm.CreatedAt,
                    UpdatedAt = lm.UpdatedAt,
                    Land = new Land
                    {
                        Id = lm.Land.Id,
                        Name = lm.Land.Name,
                        Description = lm.Land.Description,
                        Province = lm.Land.Province,
                        Photos = lm.Land.Photos,
                        Size = lm.Land.Size,
                        N = lm.Land.N,
                        P = lm.Land.P,
                        K = lm.Land.K,
                        pH = lm.Land.pH,
                        IsDeleted = lm.Land.IsDeleted,
                        UserId = lm.Land.UserId,
                        CreatedAt = lm.Land.CreatedAt,
                        UpdatedAt = lm.Land.UpdatedAt,
                    },
                    Plant = lm.Plant != null ? new Plant
                    {
                        Id = lm.Plant.Id,
                        Name = lm.Plant.Name,
                        GrowthTimeDay = lm.Plant.GrowthTimeDay,
                        IsPerennialTree = lm.Plant.IsPerennialTree,
                        Description = lm.Plant.Description,
                        Photos = lm.Plant.Photos,
                        IsDeleted = lm.Plant.IsDeleted,
                        CreatedAt = lm.Plant.CreatedAt,
                        UpdatedAt = lm.Plant.UpdatedAt
                    } : null,
                    Subscribes = lm.Subscribes.Select(s => new Subscribe
                    {
                        Id = s.Id,
                        UserId = s.UserId,
                        LandManagementId = s.LandManagementId,
                        RentedEndTime = s.RentedEndTime,
                        CreatedAt = s.CreatedAt,
                    }).OrderByDescending(s => s.CreatedAt).ToList()
                })
                .ToListAsync();

            return landManagements;
        }


        public async Task<LandManagement?> GetLandManagementByIdAsync(Guid id)
        {
            var landManagement = await _context.LandManagements!
                .Include(lm => lm.Land) // Include Land
                .Include(lm => lm.Plant) // Include Plant
                .Include(s => s.User)
                .Include(lm => lm.Subscribes)
                    .ThenInclude(s => s.User)
                .Where(x => x.Id == id)
                .Select(lm => new LandManagement
                {
                    Id = lm.Id,
                    //GrowthTimeMonth = lm.GrowthTimeMonth,
                    //GrowthStatus = lm.GrowthStatus,
                    PricePerMonth = lm.PricePerMonth,
                    HarvestMonthTime = lm.HarvestMonthTime, //
                    Status = lm.Status, //
                    IsTree = lm.IsTree,
                    IsRented = lm.IsRented,
                    IsDeleted = lm.IsDeleted,
                    LandId = lm.LandId,
                    PlantId = lm.PlantId,
                    UserId = lm.UserId,
                    CreatedAt = lm.CreatedAt,
                    UpdatedAt = lm.UpdatedAt,
                    User = new UserApp
                    {
                        Id = lm.User.Id,
                        Name = lm.User.Name,
                        Email = lm.User.Email,
                        PhoneNumber = lm.User.PhoneNumber,
                        // Include other UserApp properties as needed
                    },
                    Land = new Land
                    {
                        Id = lm.Land.Id,
                        Name = lm.Land.Name,
                        Description = lm.Land.Description,
                        Province = lm.Land.Province,
                        Photos = lm.Land.Photos,
                        Size = lm.Land.Size,
                        N = lm.Land.N,
                        P = lm.Land.P,
                        K = lm.Land.K,
                        pH = lm.Land.pH,
                        IsDeleted = lm.Land.IsDeleted,
                        UserId = lm.Land.UserId,
                        CreatedAt = lm.Land.CreatedAt,
                        UpdatedAt = lm.Land.UpdatedAt,
                    },
                    Plant = lm.Plant != null ? new Plant
                    {
                        Id = lm.Plant.Id,
                        Name = lm.Plant.Name,
                        GrowthTimeDay = lm.Plant.GrowthTimeDay,
                        IsPerennialTree = lm.Plant.IsPerennialTree,
                        Description = lm.Plant.Description,
                        Photos = lm.Plant.Photos,
                        IsDeleted = lm.Plant.IsDeleted,
                        CreatedAt = lm.Plant.CreatedAt,
                        UpdatedAt = lm.Plant.UpdatedAt
                    } : null,
                    Subscribes = lm.Subscribes.Select(s => new Subscribe
                    {
                        Id = s.Id,
                        Description = s.Description,
                        DurationTime = s.DurationTime,
                        Status = s.Status,
                        UserId = s.UserId,
                        LandManagementId = s.LandManagementId,
                        RentedEndTime = s.RentedEndTime,
                        TotalPrice = s.TotalPrice,
                        CreatedAt = s.CreatedAt,
                        User = new UserApp
                        {
                            Id = s.User.Id,
                            Name = s.User.Name,
                            Email = s.User.Email,
                            PhoneNumber = s.User.PhoneNumber,
                        }
                    }).OrderByDescending(s => s.CreatedAt).ToList()
                })
                .FirstOrDefaultAsync();

            return landManagement;
        }

        public async Task<LandManagement?> GetLandManagementByIdBasicAsync(Guid id)
        {
            var landManagement = await _context.LandManagements!
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return landManagement;
        }

        public async Task<MappingPaginationResponse<LandManagement>?> GetAllLandManagementsPendingAsync(MappingPaginationRequest paginationRequest)
        {
            var landManagements = await _context.LandManagements!
                .Include(lm => lm.Land)
                .Include(lm => lm.User)
                .Where(x => x.Status == (int)LandManagementStatus.Pending && x.IsDeleted == false)
                .Select(lm => new LandManagement
                {
                    Id = lm.Id,
                    PricePerMonth = lm.PricePerMonth,
                    HarvestMonthTime = lm.HarvestMonthTime, //
                    Status = lm.Status, //
                    IsTree = lm.IsTree,
                    IsRented = lm.IsRented,
                    IsDeleted = lm.IsDeleted,
                    LandId = lm.LandId,
                    PlantId = lm.PlantId,
                    UserId = lm.UserId,
                    CreatedAt = lm.CreatedAt,
                    UpdatedAt = lm.UpdatedAt,
                    Land = new Land
                    {
                        Id = lm.Land.Id,
                        Name = lm.Land.Name,
                        Description = lm.Land.Description,
                        Province = lm.Land.Province,
                        Photos = lm.Land.Photos,
                        Size = lm.Land.Size,
                        N = lm.Land.N,
                        P = lm.Land.P,
                        K = lm.Land.K,
                        pH = lm.Land.pH,
                        IsDeleted = lm.Land.IsDeleted,
                        UserId = lm.Land.UserId,
                        CreatedAt = lm.Land.CreatedAt,
                        UpdatedAt = lm.Land.UpdatedAt,
                    },
                    User = new UserApp
                    {
                        Id = lm.User.Id,
                        Name = lm.User.Name,
                        Email = lm.User.Email,
                        PhoneNumber = lm.User.PhoneNumber,
                    }
                })
                .ToListAsync();

            var totalCount = landManagements.Count;

            var entityProperty = landManagements.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                landManagements = landManagements.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                landManagements = landManagements.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            landManagements = landManagements.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                landManagements = landManagements.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<LandManagement>
            {
                TotalCount = totalCount,
                Data = landManagements
            };

            return response;

        }

        public async Task<LandManagement?> GetLandManagementByIdWithSubscribeAsync(Guid id)
        {
            var landManagement = await _context.LandManagements!
                .Include(lm => lm.User)
                .Include(lm => lm.Land) // Include Land
                .Include(lm => lm.Plant) // Include Plant
                .Include(lm => lm.Subscribes)
                .Where(lm => lm.Id == id)
                .Select(lm => new LandManagement
                {
                    Id = lm.Id,
                    // Uncomment the fields you need
                    // GrowthTimeMonth = lm.GrowthTimeMonth,
                    // GrowthStatus = lm.GrowthStatus,
                    PricePerMonth = lm.PricePerMonth,
                    HarvestMonthTime = lm.HarvestMonthTime, //
                    Status = lm.Status, //
                    IsTree = lm.IsTree,
                    IsRented = lm.IsRented,
                    IsDeleted = lm.IsDeleted,
                    LandId = lm.LandId,
                    PlantId = lm.PlantId,
                    UserId = lm.UserId,
                    CreatedAt = lm.CreatedAt,
                    UpdatedAt = lm.UpdatedAt,
                    User = new UserApp
                    {
                        Id = lm.User.Id,
                        Name = lm.User.Name,
                        Email = lm.User.Email,
                        PhoneNumber = lm.User.PhoneNumber,
                        // Include other UserApp properties as needed
                    },
                    Land = new Land
                    {
                        Id = lm.Land.Id,
                        Name = lm.Land.Name,
                        Description = lm.Land.Description,
                        Province = lm.Land.Province,
                        Photos = lm.Land.Photos,
                        Size = lm.Land.Size,
                        N = lm.Land.N,
                        P = lm.Land.P,
                        K = lm.Land.K,
                        pH = lm.Land.pH,
                        IsDeleted = lm.Land.IsDeleted,
                        UserId = lm.Land.UserId,
                        CreatedAt = lm.Land.CreatedAt,
                        UpdatedAt = lm.Land.UpdatedAt,
                    },
                    Plant = lm.Plant != null ? new Plant
                    {
                        Id = lm.Plant.Id,
                        Name = lm.Plant.Name,
                        GrowthTimeDay = lm.Plant.GrowthTimeDay,
                        IsPerennialTree = lm.Plant.IsPerennialTree,
                        Description = lm.Plant.Description,
                        Photos = lm.Plant.Photos,
                        IsDeleted = lm.Plant.IsDeleted,
                        CreatedAt = lm.Plant.CreatedAt,
                        UpdatedAt = lm.Plant.UpdatedAt
                    } : null,
                    Subscribes = lm.Subscribes.ToList() // Ensure Subscribes are included
                })
                .FirstOrDefaultAsync();

            return landManagement;
        }


        public Task<List<LandManagement>?> GetLandManagementsByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        //public async Task<LandManagement?> GetLandManagementByAuthorIdAsync(Guid id)
        //{
        //    var authorId = new Guid(id.ToString());
        //    var LandManagement = await _context.LandManagements!.FirstOrDefaultAsync(x => authorId == id);

        //    return LandManagement;
        //}

        public async Task<int> CreateLandManagementAsync(LandManagement newLandManagement)
        {
            await _context.LandManagements!.AddAsync(newLandManagement);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateLandManagementAsync(LandManagement editLandManagement)
        {
            _context.LandManagements!.Update(editLandManagement);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteLandManagementAsync(LandManagement deleteLandManagement)
        {
            _context.LandManagements!.Remove(deleteLandManagement);
            //_context.LandManagements!.Update(deleteLandManagement);
            return await _context.SaveChangesAsync();
        }

    }
}
