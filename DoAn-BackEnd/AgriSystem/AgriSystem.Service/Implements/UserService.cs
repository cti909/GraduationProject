using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Auth;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<UserDto>?> GetAllUsersAsync(PaginationRequest paginationRequest)
        {
            var userPagination = _mapper.Map<MappingPaginationRequest>(paginationRequest);
            if (string.IsNullOrEmpty(userPagination.SearchValue)) userPagination.SearchValue = "";

            var users = await _userRepository.GetAllUserAsync(userPagination);
            if (users is null)
            {
                throw new Exception("Không có user nào");
            }

            var response = new PaginationResponse<UserDto>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = users.TotalCount,
                Data = _mapper.Map<List<UserDto>>(users.Data)
            };

            return response;

            //var users = await _userRepository.GetAllUserAsync();
            //if (users is null)
            //{
            //    throw new Exception("Không có người dùng nào");
            //}
            //var userDtos = _mapper.Map<List<UserDto>>(users);
            //return userDtos;
        }

        //public async Task<ApplicationUser?> GetUserByIdAsync(string id)
        //{
        //    var user = await _userRepository.GetUserByIdAsync(id);
        //    if (user is null)
        //    {
        //        throw new Exception("Không tìm thấy người dùng");
        //    }
        //    return user;
        //}

        //public async Task<UserApp> CreateUserAsync(RegisterRequest entity)
        //{
        //    if (entity != null && entity.Password != null)
        //    {
        //        entity.Password = HashPassword(entity.Password);

        //        var entityCreate = _mapper.Map<UserApp>(entity);
        //        var user = await _userRepository.(entityCreate);
        //        return user;
        //    }
        //    else
        //    {
        //        throw new ArgumentNullException(nameof(entity));
        //    }
        //}

        //public async Task<bool> UpdateUserAsync(ApplicationUser user, List<IFormFile>? avatar = null!)
        //{
        //    // upload ảnh đại diện lên server
        //    string avatarUploaded = null!;
        //    if (avatar != null && avatar.Count > 0)
        //    {
        //        avatarUploaded = Helper.UploadFiles(avatar, 1, Constants.ALLOWED_EXTENSIONS_IMAGE).FirstOrDefault() ?? null!;
        //    }
        //    user.Avatar = avatarUploaded;

        //    // cập nhật người dùng
        //    var result = await _userRepository.UpdateUserAsync(user);
        //    if (!result.Succeeded)
        //    {
        //        throw new Exception($"Cập nhật người dùng thất bại: {result.Errors.First().Description}");
        //    }
        //    return result.Succeeded;
        //}

        //public async Task<bool> DeleteUserAsync(ApplicationUser deleteUser)
        //{
        //    var result = await _userRepository.DeleteUserAsync(deleteUser);
        //    if (!result.Succeeded)
        //    {
        //        throw new Exception($"Xóa người dùng thất bại: {result.Errors.First().Description}");
        //    }
        //    return result.Succeeded;
        //}


        public static string HashPassword(string password, int workFactor = 12)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(workFactor);
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

    }
}
