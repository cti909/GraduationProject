using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<MappingPaginationResponse<UserApp>?> GetAllUserAsync(MappingPaginationRequest paginationRequest);
        Task<UserApp?> GetUserByIdAsync(Guid id);
        Task<UserApp?> GetUserByEmailAsync(string email);
        //Task<ApplicationUser?> GetUserByUserNameAsync(string userName);
        //Task<ApplicationUser?> GetUserByEmaiOrUserNameAsync(string email, string userName);
        Task<int> UpdateUserAsync(UserApp user);
        Task<UserApp?> CheckLoginAsync(string email, string password);
        Task<UserApp?> CheckLoginAdminAsync(string email, string password);
        Task<UserApp?> RegisterUserAsync(UserApp user);
        //Task<IdentityResult> DeleteUserAsync(ApplicationUser data);
        //Task<bool> CheckPasswordAsync(ApplicationUser data, string password);
        //Task<IList<string>> GetRolesOfUserAsync(ApplicationUser data);
        //Task<IdentityResult> AddToRoleForUserAsync(ApplicationUser data, string roleName);
        //Task<List<Claim>> GetClaimOfUserAsync(string username);
        //Task<IdentityResult> AddClaimAsync(ApplicationUser data, string claimnType, string claimName);
        //Task<ExternalLoginInfo?> GetExternalLoginInfoAsync();
    }
}
