using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class SubscribeRepository : ISubscribeRepository
    {
        private readonly AgriSystemContext _context;
        public SubscribeRepository(AgriSystemContext context)
        {
            _context = context;
        }
        public async Task<List<Subscribe>?> GetAllSubscribesAsync()
        {
            var subscribes = await _context.Subscribes!.ToListAsync();
            return subscribes;
        }

        public async Task<MappingPaginationResponse<Subscribe>?> GetAllSubscribesByUserIdAsync(MappingPaginationTableRequest paginationRequest)
        {
            var subscribes = await _context.Subscribes!
                .Include(item => item.User)
                .Where(item => item.UserId == paginationRequest.UserId)
                .Select(item => new Subscribe
                {
                    Id = item.Id,
                    Description = item.Description,
                    Status = item.Status,
                    UserId = item.UserId,
                    TotalPrice = item.TotalPrice,
                    DurationTime = item.DurationTime,
                    RentedEndTime = item.RentedEndTime,
                    CreatedAt = item.CreatedAt,
                    User = new UserApp
                    {
                        Id = item.User.Id,
                        Name = item.User.Name,
                        Email = item.User.Email,
                        PhoneNumber = item.User.PhoneNumber
                    }
                })
            .ToListAsync();

            var totalCount = subscribes.Count;

            var entityProperty = subscribes.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                subscribes = subscribes.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                subscribes = subscribes.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            subscribes = subscribes.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // row per page
            if (paginationRequest.TopSelect != 0)
            {
                subscribes = subscribes.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<Subscribe>
            {
                TotalCount = totalCount,
                Data = subscribes
            };

            return response;
        }

        public async Task<Subscribe?> GetSubscribeByIdAsync(Guid id)
        {
            var subscribe = await _context.Subscribes!
                .Include(s => s.User) // Include User
                .Include(s => s.LandManagement) // Include LandManagement
                    .ThenInclude(lm => lm.Land) // Include Land within LandManagement
                .Include(s => s.LandManagement)
                    .ThenInclude(lm => lm.Plant) // Include Plant within LandManagement
                .Where(x => x.Id == id)
                .Select(s => new Subscribe
                {
                    Id = s.Id,
                    Description = s.Description,
                    DurationTime = s.DurationTime,
                    RentedEndTime = s.RentedEndTime,
                    TotalPrice = s.TotalPrice,
                    Status = s.Status,
                    IsDeleted = s.IsDeleted,
                    UserId = s.UserId,
                    LandManagementId = s.LandManagementId,
                    CreatedAt = s.CreatedAt,
                    UpdatedAt = s.UpdatedAt,
                    User = new UserApp
                    {
                        Id = s.User.Id,
                        Name = s.User.Name,
                        Email = s.User.Email,
                        // Include other UserApp properties as needed
                    },
                    LandManagement = new LandManagement
                    {
                        Id = s.LandManagement.Id,
                        //GrowthTimeMonth = s.LandManagement.GrowthTimeMonth,
                        //GrowthStatus = s.LandManagement.GrowthStatus,
                        PricePerMonth = s.LandManagement.PricePerMonth,
                        //HarvestTime = s.LandManagement.HarvestTime,
                        IsTree = s.LandManagement.IsTree,
                        IsRented = s.LandManagement.IsRented,
                        IsDeleted = s.LandManagement.IsDeleted,
                        LandId = s.LandManagement.LandId,
                        PlantId = s.LandManagement.PlantId,
                        UserId = s.LandManagement.UserId,
                        CreatedAt = s.LandManagement.CreatedAt,
                        UpdatedAt = s.LandManagement.UpdatedAt,
                        User = new UserApp
                        {
                            Id = s.LandManagement.Land.User.Id,
                            Name = s.LandManagement.Land.User.Name,
                            Email = s.LandManagement.Land.User.Email,
                            PhoneNumber = s.LandManagement.Land.User.PhoneNumber,
                            // Include other UserApp properties as needed
                        },
                        Land = new Land
                        {
                            Id = s.LandManagement.Land.Id,
                            Name = s.LandManagement.Land.Name,
                            Description = s.LandManagement.Land.Description,
                            Province = s.LandManagement.Land.Province,
                            Photos = s.LandManagement.Land.Photos,
                            Size = s.LandManagement.Land.Size,
                            N = s.LandManagement.Land.N,
                            P = s.LandManagement.Land.P,
                            K = s.LandManagement.Land.K,
                            pH = s.LandManagement.Land.pH,
                            IsDeleted = s.LandManagement.Land.IsDeleted,
                            UserId = s.LandManagement.Land.UserId,
                            CreatedAt = s.LandManagement.Land.CreatedAt,
                            UpdatedAt = s.LandManagement.Land.UpdatedAt,
                            //User = new UserApp
                            //{
                            //    Id = s.LandManagement.Land.User.Id,
                            //    Name = s.LandManagement.Land.User.Name,
                            //    Email = s.LandManagement.Land.User.Email,
                            //    // Include other UserApp properties as needed
                            //}
                        },
                        Plant = s.LandManagement.Plant != null ? new Plant
                        {
                            Id = s.LandManagement.Plant.Id,
                            Name = s.LandManagement.Plant.Name,
                            GrowthTimeDay = s.LandManagement.Plant.GrowthTimeDay,
                            IsPerennialTree = s.LandManagement.Plant.IsPerennialTree,
                            Description = s.LandManagement.Plant.Description,
                            Photos = s.LandManagement.Plant.Photos,
                            IsDeleted = s.LandManagement.Plant.IsDeleted,
                            CreatedAt = s.LandManagement.Plant.CreatedAt,
                            UpdatedAt = s.LandManagement.Plant.UpdatedAt
                        } : null
                    }
                })
                .FirstOrDefaultAsync();

            return subscribe;
        }

        public async Task<Subscribe?> GetSubscribeByIdBasicAsync(Guid id)
        {
            var subscribe = await _context.Subscribes!
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return subscribe;
        }


        public async Task<int> CreateSubscribeAsync(Subscribe newSubscribe)
        {
            await _context.Subscribes!.AddAsync(newSubscribe);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateSubscribeAsync(Subscribe editSubscribe)
        {
            _context.Subscribes!.Update(editSubscribe);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteSubscribeAsync(Subscribe deleteSubscribe)
        {
            _context.Subscribes!.Remove(deleteSubscribe);
            //_context.Subscribes!.Update(deleteSubscribe);
            return await _context.SaveChangesAsync();
        }
    }
}
