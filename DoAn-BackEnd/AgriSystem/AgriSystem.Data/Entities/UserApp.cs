using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Users")]
    public class UserApp
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }


        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public int AccountBalance { get; set; } = 0;

        [Required, MaxLength(100)]
        public string PhoneNumber { get; set; }

        [Required, MaxLength(100)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string? RefeshToken { get; set; }

        public bool IsDeleted { get; set; } = false;

        public string Role { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        // Relation
        //public virtual UserRole UserRole { get; set; }
        //public virtual List<Comment> Comments { get; set; }
        public virtual List<Land> Lands { get; set; }
        //public virtual List<Plant> Plants { get; set; }
        public virtual List<LandManagement> LandManagements { get; set; }
        public virtual List<Subscribe> Subscribes { get; set; }
        public virtual List<PlantDisease> PlantDiseases { get; set; }

        public virtual List<Transaction> Transactions { get; set; }
        public virtual List<LandManagementLog> LandManagementLogs { get; set; }

    }
}
