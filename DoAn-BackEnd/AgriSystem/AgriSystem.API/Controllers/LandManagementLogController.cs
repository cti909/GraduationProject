using AgriSystem.Service.Dtos.LandManagementLog;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AgriSystem.API.Controllers
{
    [Route("api/landManagementLog")]
    [ApiController]
    public class LandManagementLogController : ControllerBase
    {
        private readonly ILandManagementLogService _landManagementLogService;

        public LandManagementLogController(ILandManagementLogService landManagementService)
        {
            _landManagementLogService = landManagementService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetLandManagementLogDetail([FromQuery] GetLandManagementLogRequest request)
        {
            try
            {
                var landManagementService = await _landManagementLogService.GetAllLandManagementLogsDetailAsync(request);
                return Ok(landManagementService);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPatch("")]
        public async Task<IActionResult> UpdateLandManagementLog(UpdateLandManagementLogRequest request)
        {
            try
            {
                var result = await _landManagementLogService.UpdateLandManagementLogAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }
    }
}
