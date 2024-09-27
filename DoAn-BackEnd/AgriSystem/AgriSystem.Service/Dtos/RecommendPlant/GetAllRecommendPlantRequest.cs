namespace AgriSystem.Service.Dtos.RecommendPlant
{
    public class GetAllRecommendPlantRequest
    {
        public Guid? LandManagementId { get; set; } = Guid.Empty;
        public Guid? SubscribeId { get; set; } = Guid.Empty;
    }
}
