using AgriSystem.Data.Entities;

namespace AgriSystem.Service.Helper
{
    public interface IJwtTokenHelper
    {
        string? Generate(UserApp user);
        bool VerifyJwtToken(string? token);
    }
}
