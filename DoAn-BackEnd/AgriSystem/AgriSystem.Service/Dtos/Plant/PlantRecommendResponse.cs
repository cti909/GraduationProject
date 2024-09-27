namespace AgriSystem.Service.Dtos.Plant
{
    public class PlantRecommendResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public List<LabelDto> Labels { get; set; }
        //public List<double> Probabilities { get; set; }
    }

    public class LabelDto
    {
        public string Crop { get; set; }
        public float Distance { get; set; }
    }
}
