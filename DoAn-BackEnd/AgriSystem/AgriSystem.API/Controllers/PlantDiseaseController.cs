using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.PlantDisease;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace AgriSystem.API.Controllers
{
    [Route("api/plantDisease")]
    [ApiController]
    public class PlantDiseaseController : ControllerBase
    {
        private readonly IPlantDiseaseService _plantDiseaseService;
        private static readonly HttpClient _httpClient = new HttpClient();

        public PlantDiseaseController(IPlantDiseaseService plantDiseaseService)
        {
            _plantDiseaseService = plantDiseaseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPlantDiseases([FromQuery] PaginationTableRequest paginationRequest)
        {
            try
            {
                var plants = await _plantDiseaseService.GetAllPlantDiseasesAsync(paginationRequest);
                return Ok(plants);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }


        [HttpPost("classifyPlantDisease")]
        public async Task<IActionResult> ClassifyPlantDisease(CreatePlantDiseaseRequest newPlantDisease)
        {
            try
            {
                if (newPlantDisease.Photos == null || newPlantDisease.Photos.Count == 0)
                {
                    return BadRequest("No photos uploaded.");
                }

                var file = newPlantDisease.Photos.First();

                PredictResponse responseString;
                using (var content = new MultipartFormDataContent())
                {
                    var fileStreamContent = new StreamContent(file.OpenReadStream());
                    fileStreamContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                    content.Add(fileStreamContent, "photo", file.FileName);

                    var response = await _httpClient.PostAsync("http://127.0.0.1:5000/api/VGG16", content);
                    response.EnsureSuccessStatusCode();

                    responseString = await response.Content.ReadFromJsonAsync<PredictResponse>();

                    //var predictResponse = JsonSerializer.Deserialize<PredictResponse>(responseString);
                }

                var result = await _plantDiseaseService.CreatePlantDiseaseAsync(newPlantDisease, responseString);
                return Ok(responseString);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }
    }
}
