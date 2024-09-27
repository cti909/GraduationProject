using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLandManagementv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagements_Lands_LandId",
                table: "LandManagements");

            migrationBuilder.DropIndex(
                name: "IX_LandManagements_LandId",
                table: "LandManagements");

            migrationBuilder.CreateIndex(
                name: "IX_LandManagements_LandId",
                table: "LandManagements",
                column: "LandId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagements_Lands_LandId",
                table: "LandManagements",
                column: "LandId",
                principalTable: "Lands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LandManagements_Lands_LandId",
                table: "LandManagements");

            migrationBuilder.DropIndex(
                name: "IX_LandManagements_LandId",
                table: "LandManagements");

            migrationBuilder.CreateIndex(
                name: "IX_LandManagements_LandId",
                table: "LandManagements",
                column: "LandId");

            migrationBuilder.AddForeignKey(
                name: "FK_LandManagements_Lands_LandId",
                table: "LandManagements",
                column: "LandId",
                principalTable: "Lands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
