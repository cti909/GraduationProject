using AgriSystem.Service.Dtos.RecommendPlant;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace AgriSystem.API.Controllers
{
    [Route("api/recommendPlant")]
    [ApiController]
    public class RecommendPlantController : ControllerBase
    {
        private readonly IRecommendPlantService _recommendPlantService;
        private static readonly HttpClient _httpClient = new HttpClient();

        public RecommendPlantController(IRecommendPlantService recommendPlantService)
        {
            _recommendPlantService = recommendPlantService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecommendPlants([FromQuery] GetAllRecommendPlantRequest request)
        {
            try
            {
                var result = await _recommendPlantService.GetAllRecommendPlantAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecommendPlantsAsync(CreateRecommendPlantRequest request)
        {
            try
            {
                if (request.PlantId == Guid.Empty || request.LandManagementId == Guid.Empty)
                {
                    return BadRequest("Có gì đó không đúng");
                }

                var postRequest = new
                {
                    N = request.N,
                    P = request.P,
                    K = request.K,
                    ph = request.ph,
                    Label = request.Label
                };
                var apiRecommendUrl = "http://127.0.0.1:5000/api/recommend/pretrain";
                var jsonRequest = JsonConvert.SerializeObject(request);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(apiRecommendUrl, content);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new Exception("Không thể kết nối đến server AI");
                }

                var result = await _recommendPlantService.CreateRecommendPlantAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }

        }
    }
}
