using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AgriSystem.Service.Dtos.PlantDisease
{
    public class CreatePlantDiseaseRequest
    {

        [Required(ErrorMessage = "UserId not null")]
        public Guid UserId { get; set; }

        [MaxLength(5000)]
        public List<IFormFile>? Photos { get; set; }
    }
}
