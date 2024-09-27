using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("RecommendPlants")]
    public class RecommendPlant
    {
        [Key]
        public Guid Id { get; set; }

        public Guid PlantId { get; set; }
        public Guid SubscribeId { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public virtual Plant Plant { get; set; }
    }
}
