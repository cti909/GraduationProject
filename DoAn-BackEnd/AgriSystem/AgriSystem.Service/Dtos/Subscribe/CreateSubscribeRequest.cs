namespace AgriSystem.Service.Dtos.Subscribe
{
    public class CreateSubscribeRequest
    {
        public string Description { get; set; }
        public int DurationTime { get; set; }
        public int TotalPrice { get; set; }
        public Guid UserId { get; set; }
        public Guid LandManagementId { get; set; }
    }
}
