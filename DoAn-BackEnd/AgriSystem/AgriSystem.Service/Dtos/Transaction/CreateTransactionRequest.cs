namespace AgriSystem.Service.Dtos.Transaction
{
    public class CreateTransactionRequest
    {
        public int Money { get; set; }
        public int Status { get; set; }
        public Guid UserId { get; set; }
    }
}
