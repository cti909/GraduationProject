namespace AgriSystem.Service.Dtos.LandManagementLog
{
    public class UpdateLandManagementLogRequest
    {
        public Guid Id { get; set; }
        //public int Status { get; set; } = 1;
        public string Content { get; set; }
    }
}
