using AgriSystem.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AgriSystem.Data
{
    public class AgriSystemContext : DbContext
    {
        private readonly String connectionString;

        public AgriSystemContext(DbContextOptions<AgriSystemContext> options, IConfiguration configuration) : base(options)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public virtual DbSet<PhotoMedia> PhotoMedias { set; get; }
        public virtual DbSet<UserApp> Users { set; get; }
        //public virtual DbSet<UserRole> Roles { set; get; }
        //public virtual DbSet<Comment> Comments { set; get; }
        public virtual DbSet<Land> Lands { set; get; }
        public virtual DbSet<Plant> Plants { set; get; }
        public virtual DbSet<LandManagement> LandManagements { set; get; }
        public virtual DbSet<Subscribe> Subscribes { set; get; }
        public virtual DbSet<PlantDisease> PlantDiseases { set; get; }

        public virtual DbSet<Transaction> Transactions { set; get; }
        public virtual DbSet<Province> Provinces { set; get; }

        public virtual DbSet<LandManagementLog> LandManagementLogs { set; get; }

        public virtual DbSet<RecommendPlant> RecommendPlants { set; get; } //

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(
               connectionString,
               builder => builder.MigrationsAssembly("AgriSystem.Data")
            );

            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //SeedData.Put(modelBuilder);

            // Transaction
            modelBuilder.Entity<Transaction>()
                .HasOne(x => x.User)
                .WithMany(x => x.Transactions)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);


            // PlantDisease
            modelBuilder.Entity<PlantDisease>()
                .HasOne(x => x.User)
                .WithMany(x => x.PlantDiseases)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //// Constraints Comment
            //modelBuilder.Entity<Comment>()
            //    .HasOne(x => x.User)
            //    .WithMany(x => x.Comments)
            //    .HasForeignKey(x => x.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);

            // Constraints Land
            modelBuilder.Entity<Land>()
                .HasOne(x => x.User)
                .WithMany(x => x.Lands)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //// Constraints Plant
            //modelBuilder.Entity<Plant>()
            //    .HasOne(x => x.User)
            //    .WithMany(x => x.Plants)
            //    .HasForeignKey(x => x.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);

            // Constraints Plant
            modelBuilder.Entity<RecommendPlant>()
                .HasOne(x => x.Plant)
                .WithMany(x => x.RecommendPlants)
                .HasForeignKey(x => x.PlantId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints LandManagement -- del
            //modelBuilder.Entity<LandManagement>()
            //    .HasOne(x => x.Land)
            //    .WithMany(x => x.LandManagements)
            //    .HasForeignKey(x => x.LandId)
            //    .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LandManagement>()
                .HasOne(x => x.Plant)
                .WithMany(x => x.LandManagements)
                .HasForeignKey(x => x.PlantId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints Subscribe
            modelBuilder.Entity<Subscribe>()
                .HasOne(x => x.User)
                .WithMany(x => x.Subscribes)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);


            //
            modelBuilder.Entity<LandManagementLog>()
                .HasOne(x => x.User)
                .WithMany(x => x.LandManagementLogs)
                .HasForeignKey(x => x.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LandManagementLog>()
                .HasOne(x => x.Plant)
                .WithMany(x => x.LandManagementLogs)
                .HasForeignKey(x => x.PlantId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LandManagementLog>()
                .HasOne(x => x.LandManagement)
                .WithMany(x => x.LandManagementLogs)
                .HasForeignKey(x => x.LandManagementId)
                .OnDelete(DeleteBehavior.Restrict);

        }

    }
}
