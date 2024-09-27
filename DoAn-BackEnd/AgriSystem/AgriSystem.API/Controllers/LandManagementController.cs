using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.LandManagement;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AgriSystem.API.Controllers
{
    [Route("api/landManagement")]
    [ApiController]
    public class LandManagementController : ControllerBase
    {
        private readonly ILandManagementService _landManagementService;

        public LandManagementController(ILandManagementService landManagementService)
        {
            _landManagementService = landManagementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLandManagementsByUserId(Guid userId)
        {
            try
            {
                var landManagementService = await _landManagementService.GetAllLandManagementsByUserIdAsync(userId);
                return Ok(landManagementService);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpGet("pendingStatus")]
        public async Task<IActionResult> GetAllLandManagementsPending([FromQuery] PaginationRequest paginationRequest)
        {
            try
            {
                var lands = await _landManagementService.GetAllLandManagementsPendingAsync(paginationRequest);
                return Ok(lands);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLandManagementById(Guid id)
        {
            try
            {
                var plant = await _landManagementService.GetLandManagementByIdAsync(id);
                return Ok(plant);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost("{id}/status")]
        public async Task<IActionResult> UpdateLandManagementStatusPlant(Guid id, UpdateLandManagementStatusRequest request)
        {
            try
            {
                var plant = await _landManagementService.UpdateLandManagementStatusAsync(id, request.Status);
                return Ok(plant);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost("{id}/finishPlant")]
        public async Task<IActionResult> UpdateLandManagementFinishPlant(Guid id)
        {
            try
            {
                var plant = await _landManagementService.UpdateLandManagementFinishPlantAsync(id);
                return Ok(plant);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }
    }
}
