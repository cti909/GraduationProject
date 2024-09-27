namespace AgriSystem.Service.Dtos.LandManagement
{
    public class CancelSubscribeRequest
    {
        public Guid SubscribeId { get; set; }
        public Guid LandManagementId { get; set; }

    }
}
