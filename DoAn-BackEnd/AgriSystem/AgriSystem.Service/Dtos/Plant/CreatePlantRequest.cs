using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AgriSystem.Service.Dtos.Plant
{
    public class CreatePlantRequest
    {
        [Required(ErrorMessage = "Name not null")]
        public string Name { get; set; }

        [Required(ErrorMessage = "GrowthTimeDay not null")]
        public int? GrowthTimeDay { get; set; }

        [Required(ErrorMessage = "Description not null")]
        public string Description { get; set; }
        [Required(ErrorMessage = "IsPerennialTree not null")]
        public bool IsPerennialTree { get; set; } = false;

        public List<IFormFile>? Photos { get; set; }

        //[Required(ErrorMessage = "UserId not null")]
        //public Guid UserId { get; set; }
    }
}
