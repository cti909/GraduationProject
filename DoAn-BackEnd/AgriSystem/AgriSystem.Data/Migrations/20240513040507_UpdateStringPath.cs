using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStringPath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photos",
                table: "Plants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photos",
                table: "Lands",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photos",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "Photos",
                table: "Lands");
        }
    }
}
