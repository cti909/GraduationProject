namespace AgriSystem.Service.Dtos.LandManagementLog
{
    public class GetLandManagementLogRequest
    {
        //public Guid PlantId { get; set; }
        public Guid LandManagementId { get; set; } = Guid.Empty;
        public Guid SubscribeId { get; set; } = Guid.Empty;
        public Guid CustomerId { get; set; }
    }
}
