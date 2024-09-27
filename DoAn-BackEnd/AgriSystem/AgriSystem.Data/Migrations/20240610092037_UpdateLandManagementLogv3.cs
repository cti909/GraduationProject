using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLandManagementLogv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_LandManagements_LandmanagementId",
                table: "LandManagementLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_Users_LandmanagementId",
                table: "LandManagementLogs");

            migrationBuilder.DropColumn(
                name: "GrowthStatus",
                table: "LandManagements");

            migrationBuilder.DropColumn(
                name: "GrowthTimeMonth",
                table: "LandManagements");

            migrationBuilder.DropColumn(
                name: "HarvestTime",
                table: "LandManagements");

            migrationBuilder.RenameColumn(
                name: "LandmanagementId",
                table: "LandManagementLogs",
                newName: "LandManagementId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "LandManagementLogs",
                newName: "CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_LandManagementLogs_LandmanagementId",
                table: "LandManagementLogs",
                newName: "IX_LandManagementLogs_LandManagementId");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "LandManagementLogs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_LandManagements_LandManagementId",
                table: "LandManagementLogs",
                column: "LandManagementId",
                principalTable: "LandManagements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_Users_LandManagementId",
                table: "LandManagementLogs",
                column: "LandManagementId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_LandManagements_LandManagementId",
                table: "LandManagementLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_Users_LandManagementId",
                table: "LandManagementLogs");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "LandManagementLogs");

            migrationBuilder.RenameColumn(
                name: "LandManagementId",
                table: "LandManagementLogs",
                newName: "LandmanagementId");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "LandManagementLogs",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_LandManagementLogs_LandManagementId",
                table: "LandManagementLogs",
                newName: "IX_LandManagementLogs_LandmanagementId");

            migrationBuilder.AddColumn<string>(
                name: "GrowthStatus",
                table: "LandManagements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "GrowthTimeMonth",
                table: "LandManagements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HarvestTime",
                table: "LandManagements",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_LandManagements_LandmanagementId",
                table: "LandManagementLogs",
                column: "LandmanagementId",
                principalTable: "LandManagements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_Users_LandmanagementId",
                table: "LandManagementLogs",
                column: "LandmanagementId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
