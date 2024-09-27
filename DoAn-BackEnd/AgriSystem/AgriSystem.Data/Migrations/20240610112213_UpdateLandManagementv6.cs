using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLandManagementv6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "HarvestTime",
                table: "LandManagements",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HarvestTime",
                table: "LandManagements");
        }
    }
}
