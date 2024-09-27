namespace AgriSystem.Service.Dtos.Plant
{
    public class UpdatePlantRequest
    {
        public string? Name { get; set; }

        public int? GrowthTimeDay { get; set; }

        public string? Description { get; set; }

        public bool? IsDeleted { get; set; }

        //public Guid UserId { get; set; }
    }
}
