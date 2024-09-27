namespace AgriSystem.Service.Dtos.Plant
{
    public class RecommendPlantRequest
    {
        public int? top_select { get; set; } = 5;

        public int N { get; set; }

        public int P { get; set; }

        public int K { get; set; }

        public float ph { get; set; }
    }
}
