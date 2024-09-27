namespace AgriSystem.Service.Dtos.Auth
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string? RefeshToken { get; set; }
        public bool IsDeleted { get; set; }
        public string Role { get; set; }
        public int AccountBalance { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
    }
}
