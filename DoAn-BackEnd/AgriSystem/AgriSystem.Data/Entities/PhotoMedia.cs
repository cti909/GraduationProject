using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("PhotoMedias")]
    public class PhotoMedia
    {
        [Key]
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public bool IsDeleted { get; set; } = false;

        public string? Url { get; set; }

        public string? Type { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
