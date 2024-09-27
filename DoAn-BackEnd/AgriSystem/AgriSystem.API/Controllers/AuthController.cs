using AgriSystem.Service.Dtos.Auth;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgriSystem.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        private readonly IJwtTokenHelper _jwtTokenHelper;

        public AuthController(IAuthService authService, IJwtTokenHelper jwtTokenHelper, IUserService userService)
        {
            this._jwtTokenHelper = jwtTokenHelper;
            this._authService = authService;
            this._userService = userService;
        }

        //[AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterRequest request)
        {
            try
            {
                var result = await _authService.RegisterUserAsync(request);

                if (result == null)
                {
                    return BadRequest("Có lỗi trong quá trình đăng ký");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[AllowAnonymous]
        [HttpPost("login")]
        //[Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            try
            {
                if (loginRequest == null)
                {
                    return BadRequest(new { message = "Bạn cần nhập thông tin" });
                }
                else
                {
                    var user = await _authService.CheckLoginAsync(loginRequest);
                    if (user == null)
                    {
                        return BadRequest(new { message = "Tài khoản hoặc mật khẩu bị sai" });
                    }
                    else
                    {
                        var token = _jwtTokenHelper.Generate(user);
                        var responseData = new
                        {
                            accessToken = token,
                            user = user
                        };
                        return Ok(responseData);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        //[AllowAnonymous]
        [HttpPost("loginAdmin")]
        //[Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> LoginAdmin(LoginRequest loginRequest)
        {
            try
            {
                if (loginRequest == null)
                {
                    return BadRequest(new { message = "Bạn cần nhập thông tin" });
                }
                else
                {
                    var user = await _authService.CheckLoginAdminAsync(loginRequest);
                    if (user == null)
                    {
                        return BadRequest(new { message = "Tài khoản hoặc mật khẩu bị sai" });
                    }
                    else
                    {
                        var token = _jwtTokenHelper.Generate(user);
                        var responseData = new
                        {
                            accessToken = token,
                            user = user
                        };
                        return Ok(responseData);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        //[AllowAnonymous]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                var httpcontext = HttpContext.User.Identities.FirstOrDefault();
                var tokenString = Request.Headers["Authorization"];

                if (tokenString.IsNullOrEmpty())
                {
                    return Unauthorized("Invalid or expired token");
                }
                else
                {
                    if (_jwtTokenHelper.VerifyJwtToken(tokenString))
                    {
                        var jwtHandler = new JwtSecurityTokenHandler();
                        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                        var parsedToken = jwtHandler.ReadJwtToken(token);

                        var userId = parsedToken.Claims.First(claim => claim.Type == "Id").Value;

                        if (!(await _authService.GetMe(Guid.Parse(userId)) is var user) || user == null)
                        {
                            return NotFound("User not exist");
                        }
                        else
                        {
                            return Ok(user);
                        }
                    }
                    else
                    {
                        return Unauthorized("Invalid or expired token");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
