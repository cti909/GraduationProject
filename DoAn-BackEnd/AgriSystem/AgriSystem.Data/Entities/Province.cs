using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Provinces")]
    public class Province
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public float Latitude { get; set; } = 0;

        public float Longitude { get; set; } = 0;
    }
}
