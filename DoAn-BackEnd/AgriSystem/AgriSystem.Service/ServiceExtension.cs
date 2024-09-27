using AgriSystem.Repository.Implements;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Service.Helper;
using AgriSystem.Service.Implements;
using AgriSystem.Service.Interfaces;
using AgriSystem.Service.VNPayService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AgriSystem.Service
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDependencyInjectionExtension(this IServiceCollection services)
        {
            services.AddScoped<IJwtTokenHelper, JwtTokenHelper>();
            //services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // user & auth
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();

            // plant
            services.AddScoped<IPlantRepository, PlantRepository>();
            services.AddScoped<IPlantService, PlantService>();

            // land
            services.AddScoped<ILandRepository, LandRepository>();
            services.AddScoped<ILandService, LandService>();

            // land management
            services.AddScoped<ILandManagementRepository, LandManagementRepository>();
            services.AddScoped<ILandManagementService, LandManagementService>();

            // Subscribe
            services.AddScoped<ISubscribeRepository, SubscribeRepository>();
            services.AddScoped<ISubscribeService, SubscribeService>();


            // Transaction
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<ITransactionService, TransactionService>();

            // Province
            services.AddScoped<IProvinceRepository, ProvinceRepository>();
            services.AddScoped<IProvinceService, ProvinceService>();

            // LandManagementLog
            services.AddScoped<ILandManagementLogRepository, LandManagementLogRepository>();
            services.AddScoped<ILandManagementLogService, LandManagementLogService>();

            // RecommendPlant
            services.AddScoped<IRecommendPlantRepository, RecommendPlantRepository>();
            services.AddScoped<IRecommendPlantService, RecommendPlantService>();

            // ai
            services.AddScoped<IPlantDiseaseRepository, PlantDiseaseRepository>();
            services.AddScoped<IPlantDiseaseService, PlantDiseaseService>();

            //
            services.AddTransient<ConfigVnpayConstant>();

            return services;
        }

        public static void AddJWTExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["JwtSettings:Issuer"],
                    ValidAudience = configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"])),
                    //ClockSkew = TimeSpan.Zero
                };
            });
        }

        public static void AddStaticFileExtension(this IApplicationBuilder app)
        {
            var folderName = Path.Combine("Resources");
            var staticPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (!Directory.Exists(staticPath))
            {
                Directory.CreateDirectory(staticPath);
            }

            var options = new StaticFileOptions
            {
                FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(staticPath),
                RequestPath = "/Resources"
            };

            app.UseStaticFiles(options);
        }
    }
}
