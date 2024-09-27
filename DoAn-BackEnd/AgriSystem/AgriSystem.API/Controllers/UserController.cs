using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgriSystem.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtTokenHelper _jwtTokenHelper;

        public UserController(IUserService userService, IJwtTokenHelper jwtTokenHelper)
        {
            this._jwtTokenHelper = jwtTokenHelper;
            this._userService = userService;
        }

        //check role
        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] PaginationRequest paginationRequest)
        {
            try
            {
                var result = await _userService.GetAllUsersAsync(paginationRequest);

                if (result == null)
                {
                    return BadRequest("Không có người dùng");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

        }
    }
}
