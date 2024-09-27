using AgriSystem.Data.EnumStatus;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("LandManagements")]
    public class LandManagement
    {
        [Key]
        public Guid Id { get; set; }

        //public int? GrowthTimeMonth { get; set; }

        //public string GrowthStatus { get; set; } = "Bắt đầu";

        public int? PricePerMonth { get; set; }

        [DataType(DataType.DateTime)]
        public int? HarvestMonthTime { get; set; } // list month of harvest (json)
        public int Status { get; set; } = (int)LandManagementStatus.Pending;
        public bool IsTree { get; set; } = false;

        public bool IsRented { get; set; } = false; // check customer rent land

        public bool IsDeleted { get; set; } = false;

        public Guid LandId { get; set; }
        public Guid? PlantId { get; set; }
        public Guid UserId { get; set; }  // farmer


        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        // Relation
        public virtual UserApp User { get; set; }
        public virtual Land Land { get; set; }
        public virtual Plant Plant { get; set; }
        public virtual List<Subscribe> Subscribes { get; set; }
        public virtual List<LandManagementLog> LandManagementLogs { get; set; }
    }
}
