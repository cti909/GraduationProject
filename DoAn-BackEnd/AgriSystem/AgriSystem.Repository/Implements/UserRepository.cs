using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class UserRepository : IUserRepository
    {
        private readonly AgriSystemContext _context;

        public UserRepository(AgriSystemContext context)
        {
            _context = context;
        }

        // --------------------------- auth-----------------------------------------
        public async Task<UserApp?> RegisterUserAsync(UserApp entity)
        {
            var user = await _context.Users!.AddAsync(entity);
            await _context.SaveChangesAsync();
            return user.Entity;
        }

        public async Task<UserApp?> CheckLoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                    e => e.Email == email &&
                    !e.IsDeleted);

            if (user != null)
            {
                var checkPassword = BCrypt.Net.BCrypt.Verify(password, user.Password);
                if (checkPassword)
                {
                    return user;
                }
            }

            return null;
        }

        public async Task<UserApp?> CheckLoginAdminAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                    e => e.Email == email &&
                    !e.IsDeleted &&
                    e.Role == "admin");

            if (user != null)
            {
                var checkPassword = BCrypt.Net.BCrypt.Verify(password, user.Password);
                if (checkPassword)
                {
                    return user;
                }
            }

            return null;
        }

        // --------------------------- user-----------------------------------------
        public async Task<MappingPaginationResponse<UserApp>?> GetAllUserAsync(MappingPaginationRequest paginationRequest)
        {
            // remove select password
            var users = await _context.Users!
                .Where(e => e.Name.Contains(paginationRequest.SearchValue!))
                .Select(u => new UserApp
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    AccountBalance = u.AccountBalance,
                    PhoneNumber = u.PhoneNumber,
                    Address = u.Address,
                    Role = u.Role,
                    IsDeleted = u.IsDeleted,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt
                })
            .ToListAsync();

            var totalCount = users.Count;

            var entityProperty = users.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                users = users.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                users = users.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            users = users.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                users = users.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<UserApp>
            {
                TotalCount = totalCount,
                Data = users
            };

            return response;
        }

        public async Task<UserApp?> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users!
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<UserApp?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users!
                .Where(item => item.Email == email)
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<int> UpdateUserAsync(UserApp user)
        {
            _context.Users!.Update(user);
            return await _context.SaveChangesAsync();
        }

        //public async Task<IEnumerable<MstAppRole?>> GetAllAppRoleAsync()
        //{
        //    return await context.MstAppRole.Where(e => !e.ARDelFlg).ToListAsync();
        //}

        //public async Task<string> GetUserIDMax()
        //{
        //    try
        //    {
        //        var latestUserID = await context.UserApp.MaxAsync(user => user.UserNo);

        //        int latestUserNumber;

        //        if (!string.IsNullOrEmpty(latestUserID) && latestUserID.StartsWith("User") && int.TryParse(latestUserID[5..], out latestUserNumber))
        //        {
        //            latestUserNumber++;
        //        }
        //        else
        //        {
        //            latestUserNumber = 1;
        //        }

        //        string nextUserID = $"User-{latestUserNumber:D4}";
        //        return nextUserID;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<UserApp?> GetUserByNo(string userNo)
        //{
        //    return await context.UserApp
        //        .Where(e => e.UserNo == userNo && !e.UserDelFlg)
        //        .Select(result => new UserApp
        //        {
        //            UserNo = result.UserNo,
        //            UserName = result.UserName,
        //            UserPassword = result.UserPassword,
        //            UserSex = result.UserSex,
        //            UserPhoneNum = result.UserPhoneNum,
        //            UserEmail = result.UserEmail,
        //            UserBirthday = result.UserBirthday,
        //            UserAddress = result.UserAddress,
        //            UserImageUrl = result.UserImageUrl,
        //            UserFBUrl = result.UserFBUrl,
        //            UserInStaUrl = result.UserInStaUrl,
        //            UserTWUrl = result.UserTWUrl,
        //            UserStatus = result.UserStatus,
        //            UserRoleApp = result.UserRoleApp,
        //            UserCreateDate = result.UserCreateDate,
        //            UserLastUpdateDate = result.UserLastUpdateDate,
        //            UserDelFlg = result.UserDelFlg,
        //        })
        //        .FirstOrDefaultAsync();
        //}

        //public async Task<string?> GetUserNo(string userNo)
        //{
        //    return await context.UserApp.Where(e => e.UserNo == userNo && !e.UserDelFlg).Select(e => e.UserNo).FirstOrDefaultAsync();
        //}

        //public async Task<string?> GetUserPass(string userNo)
        //{
        //    return await context.UserApp.Where(e => e.UserNo == userNo && !e.UserDelFlg).Select(e => e.UserPassword).FirstOrDefaultAsync();
        //}


    }
}
