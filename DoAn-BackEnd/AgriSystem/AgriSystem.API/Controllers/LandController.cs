using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Land;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AgriSystem.API.Controllers
{
    [Route("api/land")]
    [ApiController]
    public class LandController : ControllerBase
    {
        private readonly ILandService _landService;

        public LandController(ILandService LandService)
        {
            _landService = LandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLands([FromQuery] PaginationRequest paginationRequest)
        {
            try
            {
                var lands = await _landService.GetAllLandsAsync(paginationRequest);
                return Ok(lands);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLandById(Guid id)
        {
            try
            {
                var Land = await _landService.GetLandByIdAsync(id);
                return Ok(Land);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        //[HttpGet("name")]
        //public async Task<IActionResult> GetLandsByName(string name)
        //{
        //    try
        //    {
        //        var Lands = await _landService.GetLandsByNameAsync(name);
        //        return Ok(Lands);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateLand(CreateLandRequest newLand)
        {
            try
            {
                var result = await _landService.CreateLandAsync(newLand);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }




        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateLand(Guid id, UpdateLandRequest editLand)
        //{
        //    try
        //    {
        //        if (editLand == null)
        //        {
        //            return BadRequest("Invalid Land data or Land number is missing.");
        //        }

        //        var result = await _landService.UpdateLandAsync(id, editLand);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLand(Guid id)
        //{
        //    try
        //    {
        //        // set IsDelete = true
        //        var result = await _landService.DeleteLandAsync(id);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}
    }
}
