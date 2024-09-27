using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Lands")]
    public class Land
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }


        [MaxLength(100)]
        public string? Description { get; set; }

        //public long PricePerMonth { get; set; }

        [MaxLength(100)]
        public string Province { get; set; } // create table City

        public string? Photos { get; set; } // list path json of photos

        [Required]
        public float Size { get; set; }

        public int N { get; set; }
        public int P { get; set; }
        public int K { get; set; }
        public float pH { get; set; }

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
        public virtual LandManagement LandManagement { get; set; }
    }
}
