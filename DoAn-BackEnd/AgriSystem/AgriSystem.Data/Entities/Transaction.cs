using AgriSystem.Data.EnumStatus;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgriSystem.Data.Entities
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Money { get; set; }

        [Required]
        public int Status { get; set; } = (int)TransactionStatus.Pending;

        [Required]
        public Guid UserId { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public virtual UserApp User { get; set; }
    }
}
