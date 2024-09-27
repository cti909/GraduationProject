namespace AgriSystem.Service.Dtos.Land
{
    public class UpdateLandRequest
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Province { get; set; } // create table City
        public float Size { get; set; }
        public bool IsDeleted { get; set; }

        public int N { get; set; }
        public int P { get; set; }
        public int K { get; set; }
        public int pH { get; set; }

        public Guid UserId { get; set; }
    }
}
