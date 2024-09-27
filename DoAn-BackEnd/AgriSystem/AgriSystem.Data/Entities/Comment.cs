//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace AgriSystem.Data.Entities
//{
//    [Table("Comments")]
//    public class Comment
//    {
//        [Key]
//        public Guid Id { get; set; }

//        [Required, MaxLength(100)]
//        public string? Content { get; set; }

//        public string Type { get; set; } = "Plant";

//        public bool IsDeleted { get; set; } = false;

//        [Required]
//        public Guid UserId { get; set; }

//        [Required]
//        [DataType(DataType.DateTime)]
//        public DateTime CreatedAt { get; set; } = DateTime.Now;

//        [Required]
//        [DataType(DataType.DateTime)]
//        public DateTime UpdatedAt { get; set; } = DateTime.Now;


//        // Relation
//        public virtual UserApp User { get; set; }
//    }
//}
