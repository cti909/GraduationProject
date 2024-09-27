using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Auth;

namespace AgriSystem.Service.Interfaces
{
    public interface IAuthService
    {
        Task<UserApp> RegisterUserAsync(RegisterRequest newUser);
        Task<UserApp?> CheckLoginAsync(LoginRequest userLoginRequest);
        Task<UserApp?> CheckLoginAdminAsync(LoginRequest userLoginRequest);
        Task<UserDto?> GetMe(Guid id);
        //Task<bool> RegisterUser(ApplicationUser data);
        //Task<List<ApplicationUser>> GetAllUser();
        //Task<ApplicationUser> GetCurrentUser();
        //Task<LoginResponse> LoginUser(ApplicationUser data);
        //Task<string> GenerateToken(ApplicationUser data, string secretKey, DateTime expiredTime);
        //Task<AuthToken> GetToken(ApplicationUser userDb);
        //Task<bool> SaveRefreshToken(ApplicationUser data, string token);
        //Task<string> CheckRefreshToken();
        //Task SaveToken(string token);
        //Task LogoutUser();

    }
}
