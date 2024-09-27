namespace AgriSystem.Service.Dtos.Subscribe
{
    public class UpdateSubscribePlantRequest
    {
        public Guid SubscribeId { get; set; }
        public Guid LandManagementId { get; set; }
        public Guid PlantId { get; set; }
        public Guid UserId { get; set; }
    }
}
