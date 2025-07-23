using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitnessAntrenmanPlatform.Migrations
{
    /// <inheritdoc />
    public partial class AddProfilePicToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5f0fb2aa-ed61-46e0-b2ca-53acf252d4f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5fb957e-7470-4272-8723-a7d028097cac");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePhotoUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18cd35aa-b95c-4ebf-a981-863e5a41484d", null, "Admin", "ADMIN" },
                    { "32ad56e4-b54e-47a5-a456-b345f316358a", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18cd35aa-b95c-4ebf-a981-863e5a41484d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "32ad56e4-b54e-47a5-a456-b345f316358a");

            migrationBuilder.DropColumn(
                name: "ProfilePhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5f0fb2aa-ed61-46e0-b2ca-53acf252d4f6", null, "User", "USER" },
                    { "f5fb957e-7470-4272-8723-a7d028097cac", null, "Admin", "ADMIN" }
                });
        }
    }
}
