using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSubscribev5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RentedTime",
                table: "Subscribes",
                newName: "Status");

            migrationBuilder.AddColumn<int>(
                name: "DurationTime",
                table: "Subscribes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "RentedEndTime",
                table: "Subscribes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DurationTime",
                table: "Subscribes");

            migrationBuilder.DropColumn(
                name: "RentedEndTime",
                table: "Subscribes");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Subscribes",
                newName: "RentedTime");
        }
    }
}
