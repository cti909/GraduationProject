using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLandManagementLogv4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_Users_LandManagementId",
                table: "LandManagementLogs");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "LandManagementLogs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "LandManagementLogs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_LandManagementLogs_CustomerId",
                table: "LandManagementLogs",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_Users_CustomerId",
                table: "LandManagementLogs",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagementLogs_Users_CustomerId",
                table: "LandManagementLogs");

            migrationBuilder.DropIndex(
                name: "IX_LandManagementLogs_CustomerId",
                table: "LandManagementLogs");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "LandManagementLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "LandManagementLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagementLogs_Users_LandManagementId",
                table: "LandManagementLogs",
                column: "LandManagementId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
