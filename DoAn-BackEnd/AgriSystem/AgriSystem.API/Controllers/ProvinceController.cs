using AgriSystem.Service.Dtos.Province;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AgriSystem.API.Controllers
{
    [Route("api/province")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly IProvinceService _provinceService;

        public ProvinceController(IProvinceService provinceService)
        {
            _provinceService = provinceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProvinces()
        {
            try
            {
                var provinces = await _provinceService.GetAllProvincesAsync();
                return Ok(provinces);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProvincesFromJsonAsync([FromBody] ProvinceData provinceData)
        {
            try
            {
                if (provinceData == null || provinceData.Data == null || !provinceData.Data.Any())
                {
                    return BadRequest("Invalid province data.");
                }

                var result = await _provinceService.CreateProvincesFromJsonAsync(provinceData);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }

        }
    }
}
