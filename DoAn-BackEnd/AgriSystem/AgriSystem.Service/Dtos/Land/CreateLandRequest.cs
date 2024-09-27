using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AgriSystem.Service.Dtos.Land
{
    public class CreateLandRequest
    {
        [Required(ErrorMessage = "Tên không được bỏ trống")]
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Province { get; set; } // create table City
        public float Size { get; set; }
        public bool? IsDeleted { get; set; }

        public int N { get; set; }
        public int P { get; set; }
        public int K { get; set; }
        public float pH { get; set; }

        public bool IsTree { get; set; }

        public Guid? PlantId { get; set; }

        public int? HarvestMonthTime { get; set; }

        public int PricePerMonth { get; set; } // land management

        public List<IFormFile>? Photos { get; set; }

        public Guid UserId { get; set; }
    }
}
