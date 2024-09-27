namespace AgriSystem.Service.Dtos.RecommendPlant
{
    public class CreateRecommendPlantRequest
    {
        public int N { get; set; }
        public int P { get; set; }
        public int K { get; set; }
        public float ph { get; set; }
        public string Label { get; set; }
        public Guid PlantId { get; set; }
        public Guid LandManagementId { get; set; }
    }
}
