namespace AgriSystem.Service.Dtos.Transaction
{
    public class BeginTransactionRequest
    {
        public int vnp_Amount { get; set; }
        public string vnp_BankCode { get; set; }
        public string vnp_Locale { get; set; }
        public Guid UserId { get; set; }
    }
}
