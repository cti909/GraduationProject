using AgriSystem.Data.EnumStatus;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Subscribes")]
    public class Subscribe
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string Description { get; set; }

        public int DurationTime { get; set; } = 0;

        public DateTime RentedEndTime { get; set; } = DateTime.Now;

        public int TotalPrice { get; set; }

        public int Status { get; set; } = (int)SubscribeStatus.Processing; // status rent

        public bool IsDeleted { get; set; } = false;

        public Guid UserId { get; set; }

        public Guid LandManagementId { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        // Relation
        public virtual UserApp User { get; set; }
        public virtual LandManagement LandManagement { get; set; }
    }
}
