namespace AgriSystem.Service.Dtos.Subscribe
{
    public class UpdateSubscribeRequest
    {
        public string Description { get; set; }

        public int DurationTime { get; set; }

        public DateTime RentedEndTime { get; set; }

        public int TotalPrice { get; set; }

        public int Status { get; set; } // status rent

        public bool IsDeleted { get; set; } = false;

        public Guid UserId { get; set; }

        public Guid LandManagementId { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
