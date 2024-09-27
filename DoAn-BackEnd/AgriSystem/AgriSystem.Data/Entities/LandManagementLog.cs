using System.ComponentModel.DataAnnotations;

namespace AgriSystem.Data.Entities
{
    public class LandManagementLog
    {
        [Key]
        public Guid Id { get; set; }
        public string? Action { get; set; }
        public string? Content { get; set; }
        public int Status { get; set; } = 0; // 0,1
        public int SortNumber { get; set; } = 1; // 1,2,3,4,5
        public Guid PlantId { get; set; }
        public Guid LandManagementId { get; set; }
        public Guid CustomerId { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? CompletionTime { get; set; } // thoi gian xong action cua nong dan

        // Relation
        public virtual UserApp User { get; set; }
        public virtual Plant Plant { get; set; }
        public virtual LandManagement LandManagement { get; set; }

    }
}
