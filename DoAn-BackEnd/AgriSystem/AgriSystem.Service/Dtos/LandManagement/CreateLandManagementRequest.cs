namespace AgriSystem.Service.Dtos.LandManagement
{
    public class CreateLandManagementRequest
    {

        public int GrowthTimeMonth { get; set; }

        public string GrowthStatus { get; set; } = "Bắt đầu";

        public int PricePerMonth { get; set; }

        public Guid LandId { get; set; }
        public Guid PlantId { get; set; }
    }
}
