using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePlantv1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPerennialTree",
                table: "LandManagements",
                newName: "IsTree");

            migrationBuilder.AddColumn<bool>(
                name: "IsPerennialTree",
                table: "Plants",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPerennialTree",
                table: "Plants");

            migrationBuilder.RenameColumn(
                name: "IsTree",
                table: "LandManagements",
                newName: "IsPerennialTree");
        }
    }
}
