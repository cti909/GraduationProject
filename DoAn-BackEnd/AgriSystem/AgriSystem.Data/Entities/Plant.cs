using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Plants")]
    public class Plant
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }


        //[Required]
        //public float Price { get; set; }

        public int? GrowthTimeDay { get; set; }

        public bool IsPerennialTree { get; set; } = false;

        public string? Description { get; set; }

        public string? Photos { get; set; } // list path json of photos

        public bool IsDeleted { get; set; } = false;

        //public Guid UserId { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        // Relation
        //public virtual UserApp User { get; set; }
        public virtual List<LandManagement> LandManagements { get; set; }

        public virtual List<LandManagementLog> LandManagementLogs { get; set; }

        public virtual List<RecommendPlant> RecommendPlants { get; set; } // list of recommend plant
    }
}
