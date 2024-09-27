using AgriSystem.Service.Dtos.Auth;
using AgriSystem.Service.Dtos.Base;

namespace AgriSystem.Service.Interfaces
{
    public interface IUserService
    {
        Task<PaginationResponse<UserDto>?> GetAllUsersAsync(PaginationRequest paginationRequest);
        //Task<UserApp?> GetUserByIdAsync(string id);
        //Task<UserApp> CreateUserAsync(RegisterRequest newUser);
        //Task<bool> UpdateUserAsync(UserApp data); // upload avatar
        //Task<bool> DeleteUserAsync(UserApp deleteUser);
    }
}
