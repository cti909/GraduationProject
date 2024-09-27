using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Plant;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgriSystem.API.Controllers
{
    [Route("api/plant")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly IPlantService _plantService;
        private static readonly HttpClient _httpClient = new HttpClient();

        public PlantController(IPlantService PlantService)
        {
            _plantService = PlantService;
        }

        [HttpGet]
        //[Authorize(Roles = Roles.CUSTOMER)]
        public async Task<IActionResult> GetAllPlants([FromQuery] PlantPaginationRequest paginationRequest)
        {
            try
            {
                var plants = await _plantService.GetAllPlantsAsync(paginationRequest);
                return Ok(plants);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }


        [HttpGet("perennialBasic")]
        public async Task<IActionResult> GetAllNonPerennialPlants()
        {
            try
            {
                var plants = await _plantService.GetAllPlantPerennialBasicAsync();
                return Ok(plants);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlantById(Guid id)
        {
            try
            {
                var plant = await _plantService.GetPlantByIdAsync(id);
                return Ok(plant);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost("recommend")]
        public async Task<IActionResult> GetAllPlantRecommend([FromBody] RecommendPlantRequest newPlantDisease)
        {
            try
            {
                //if (newPlantDisease.N == null || newPlantDisease.P == null || newPlantDisease.K == null || newPlantDisease.ph == null)
                //{
                //    return BadRequest("Có gì đó không đúng");
                //}

                var jsonContent = JsonSerializer.Serialize(newPlantDisease);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("http://127.0.0.1:5000/api/recommend", content);
                response.EnsureSuccessStatusCode();

                var responseString = await response.Content.ReadFromJsonAsync<PlantRecommendResponse>();

                var plants = await _plantService.GetPlantsByListNameAsync(responseString.Labels.Select(x => x.Crop).ToList());
                return Ok(plants);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlant(CreatePlantRequest newPlant)
        {
            try
            {
                var result = await _plantService.CreatePlantAsync(newPlant);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdatePlant(Guid id, UpdatePlantRequest editPlant)
        //{
        //    try
        //    {
        //        if (editPlant == null)
        //        {
        //            return BadRequest("Invalid plant data or plant number is missing.");
        //        }

        //        var result = await _plantService.UpdatePlantAsync(id, editPlant);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeletePlant(Guid id)
        //{
        //    try
        //    {
        //        // set IsDelete = true
        //        var result = await _plantService.DeletePlantAsync(id);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}
    }
}
