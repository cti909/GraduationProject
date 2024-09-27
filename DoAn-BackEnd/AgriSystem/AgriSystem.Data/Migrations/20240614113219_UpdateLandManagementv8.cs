using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLandManagementv8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HarvestTime",
                table: "LandManagements");

            migrationBuilder.AddColumn<int>(
                name: "HarvestMonthTime",
                table: "LandManagements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "LandManagements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HarvestMonthTime",
                table: "LandManagements");

            migrationBuilder.DropColumn(
                name: "status",
                table: "LandManagements");

            migrationBuilder.AddColumn<DateOnly>(
                name: "HarvestTime",
                table: "LandManagements",
                type: "date",
                nullable: true);
        }
    }
}
