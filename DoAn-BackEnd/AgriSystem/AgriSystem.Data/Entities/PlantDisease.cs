using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("PlantDiseases")]
    public class PlantDisease
    {
        [Key]
        public Guid Id { get; set; }

        public string? Photo { get; set; }

        [MaxLength(255)]
        public string? Name { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        public bool IsDeleted { get; set; } = false;

        public Guid UserId { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        // Relation
        public virtual UserApp User { get; set; }
    }
}
