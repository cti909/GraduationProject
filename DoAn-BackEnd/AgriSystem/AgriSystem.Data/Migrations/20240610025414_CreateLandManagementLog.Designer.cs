﻿// <auto-generated />
using System;
using AgriSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    [DbContext(typeof(AgriSystemContext))]
    [Migration("20240610025414_CreateLandManagementLog")]
    partial class CreateLandManagementLog
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AgriSystem.Data.Entities.Land", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("K")
                        .HasColumnType("int");

                    b.Property<int>("N")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("P")
                        .HasColumnType("int");

                    b.Property<string>("Photos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<float>("Size")
                        .HasColumnType("real");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("pH")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Lands");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.LandManagement", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("GrowthStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GrowthTimeMonth")
                        .HasColumnType("int");

                    b.Property<string>("HarvestTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRented")
                        .HasColumnType("bit");

                    b.Property<bool>("IsTree")
                        .HasColumnType("bit");

                    b.Property<Guid>("LandId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("PricePerMonth")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("LandId")
                        .IsUnique();

                    b.HasIndex("PlantId");

                    b.HasIndex("UserId");

                    b.ToTable("LandManagements");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.LandManagementLog", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("LandmanagementId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("LandmanagementId");

                    b.HasIndex("PlantId");

                    b.ToTable("LandManagementLogs");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.PhotoMedia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PhotoMedias");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Plant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("GrowthTimeDay")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPerennialTree")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Photos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Plants");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.PlantDisease", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Photo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PlantDiseases");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Subscribe", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("DurationTime")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<Guid>("LandManagementId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("RentedEndTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TotalPrice")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("LandManagementId");

                    b.HasIndex("UserId");

                    b.ToTable("Subscribes");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Money")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.UserApp", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccountBalance")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("RefeshToken")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Land", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.UserApp", "User")
                        .WithMany("Lands")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.LandManagement", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.Land", "Land")
                        .WithOne("LandManagement")
                        .HasForeignKey("AgriSystem.Data.Entities.LandManagement", "LandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AgriSystem.Data.Entities.Plant", "Plant")
                        .WithMany("LandManagements")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AgriSystem.Data.Entities.UserApp", "User")
                        .WithMany("LandManagements")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Land");

                    b.Navigation("Plant");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.LandManagementLog", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.LandManagement", "LandManagement")
                        .WithMany("LandManagementLogs")
                        .HasForeignKey("LandmanagementId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AgriSystem.Data.Entities.UserApp", "UserApp")
                        .WithMany("LandManagementLogs")
                        .HasForeignKey("LandmanagementId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AgriSystem.Data.Entities.Plant", "Plant")
                        .WithMany("LandManagementLogs")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("LandManagement");

                    b.Navigation("Plant");

                    b.Navigation("UserApp");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.PlantDisease", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.UserApp", "User")
                        .WithMany("PlantDiseases")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Subscribe", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.LandManagement", "LandManagement")
                        .WithMany("Subscribes")
                        .HasForeignKey("LandManagementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AgriSystem.Data.Entities.UserApp", "User")
                        .WithMany("Subscribes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("LandManagement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Transaction", b =>
                {
                    b.HasOne("AgriSystem.Data.Entities.UserApp", "User")
                        .WithMany("Transactions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Land", b =>
                {
                    b.Navigation("LandManagement")
                        .IsRequired();
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.LandManagement", b =>
                {
                    b.Navigation("LandManagementLogs");

                    b.Navigation("Subscribes");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.Plant", b =>
                {
                    b.Navigation("LandManagementLogs");

                    b.Navigation("LandManagements");
                });

            modelBuilder.Entity("AgriSystem.Data.Entities.UserApp", b =>
                {
                    b.Navigation("LandManagementLogs");

                    b.Navigation("LandManagements");

                    b.Navigation("Lands");

                    b.Navigation("PlantDiseases");

                    b.Navigation("Subscribes");

                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}