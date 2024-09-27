namespace AgriSystem.Service.Dtos.LandManagement
{
    public class UpdateLandManagementRequest
    {

        public int GrowthTimeMonth { get; set; }

        public string GrowthStatus { get; set; }

        public int PricePerMonth { get; set; }

        public bool IsRented { get; set; }

        public bool IsDeleted { get; set; }

        public Guid LandId { get; set; }
        public Guid PlantId { get; set; }
        public Guid UserId { get; set; }  // farmer
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
