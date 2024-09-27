using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Service.Dtos.Auth;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

        public AuthService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // login
        public async Task<UserApp?> CheckLoginAsync(LoginRequest userLoginRequest)
        {
            if (userLoginRequest == null || userLoginRequest.Email == null || userLoginRequest.Password == null)
            {
                return null;
            }
            else
            {
                var user = await _userRepository.CheckLoginAsync(userLoginRequest.Email, userLoginRequest.Password);
                if (user != null)
                {
                    var userResponse = _mapper.Map<UserApp>(user);

                    return userResponse;
                }
                else
                {
                    return null;
                }
            }
        }

        // login admin
        public async Task<UserApp?> CheckLoginAdminAsync(LoginRequest userLoginRequest)
        {
            if (userLoginRequest == null || userLoginRequest.Email == null || userLoginRequest.Password == null)
            {
                return null;
            }
            else
            {
                var user = await _userRepository.CheckLoginAdminAsync(userLoginRequest.Email, userLoginRequest.Password);
                if (user != null)
                {
                    var userResponse = _mapper.Map<UserApp>(user);

                    return userResponse;
                }
                else
                {
                    return null;
                }
            }
        }

        // register
        public async Task<UserApp> RegisterUserAsync(RegisterRequest entity)
        {
            if (entity != null && entity.Password != null)
            {
                var checkExistEmail = await _userRepository.GetUserByEmailAsync(entity.Email);
                if (checkExistEmail != null)
                {
                    throw new Exception("Email đã tồn tại");
                }

                entity.Password = HashPassword(entity.Password);
                var entityCreate = _mapper.Map<UserApp>(entity);
                var user = await _userRepository.RegisterUserAsync(entityCreate);
                return user;
            }
            else
            {
                throw new ArgumentNullException(nameof(entity));
            }
        }

        // get current user login
        public async Task<UserDto?> GetMe(Guid id)
        {
            if (id != Guid.Empty)
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                var userDto = _mapper.Map<UserDto>(user);
                return userDto;
            }
            else
            {
                throw new ArgumentNullException();
            }
        }




        // ----------Feature in class----------
        public static string HashPassword(string password, int workFactor = 12)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(workFactor);
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }
    }
}
