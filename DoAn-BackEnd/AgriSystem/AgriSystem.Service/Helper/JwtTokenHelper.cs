using AgriSystem.Data.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AgriSystem.Service.Helper
{
    public class JwtTokenHelper : IJwtTokenHelper
    {
        private readonly IConfiguration config;

        public JwtTokenHelper(IConfiguration config)
        {
            this.config = config;
        }

        public string? Generate(UserApp user)
        {
            var expireMinutesString = config["JwtSettings:ExpireMinutes"];
            var secretKeyString = config["JwtSettings:SecretKey"];
            var issuerString = config["JwtSettings:Issuer"];

            var expireMinutes = Double.Parse(expireMinutesString);
            var secretKey = Encoding.UTF8.GetBytes(secretKeyString);
            var issuer = issuerString;

            var claims = new List<Claim>() {
                new Claim("Id", user.Id.ToString()),
                new Claim("Name", user.Name),
                new Claim("Email", user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddMinutes(expireMinutes).ToUnixTimeSeconds().ToString()),
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(secretKey),
                SecurityAlgorithms.HmacSha256Signature
            );
            var securityToken = new JwtSecurityToken(
                issuer: issuer,
                audience: config["JwtSettings:Audience"],
                claims: claims,
                expires: new DateTimeOffset(DateTime.Now.AddMinutes(expireMinutes)).DateTime,
                signingCredentials: signingCredentials
            );

            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return token;
        }
        public bool VerifyJwtToken(string? token)
        {

            var jwtEncodedString = token[7..];

            var tokenHandler = new JwtSecurityTokenHandler();

            var secretKeyString = config["JwtSettings:SecretKey"];

            if (secretKeyString != null)
            {
                var secretKey = Encoding.UTF8.GetBytes(secretKeyString);
                try
                {
                    tokenHandler.ValidateToken(jwtEncodedString, new TokenValidationParameters
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    }, out SecurityToken validatedToken);

                    // Token valid
                    return true;
                }
                catch (SecurityTokenExpiredException)
                {
                    // Token not valid
                    return false;
                }
                catch (SecurityTokenInvalidSignatureException)
                {
                    // Invalid token signature (token may have been tampered with)
                    return false;
                }
                catch (SecurityTokenException)
                {
                    // Other token-related errors
                    return false;
                }
                catch (Exception)
                {
                    // Other exceptions (invalid format, etc.)
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
