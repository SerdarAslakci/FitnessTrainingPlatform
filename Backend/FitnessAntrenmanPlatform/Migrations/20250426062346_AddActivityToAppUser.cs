using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitnessAntrenmanPlatform.Migrations
{
    /// <inheritdoc />
    public partial class AddActivityToAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18cd35aa-b95c-4ebf-a981-863e5a41484d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "32ad56e4-b54e-47a5-a456-b345f316358a");

            migrationBuilder.AddColumn<double>(
                name: "ActivityFactor",
                table: "AspNetUsers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "434b80d8-fafa-41ae-96a4-433af9c8b5c2", null, "User", "USER" },
                    { "a977675d-da7a-4852-af7b-a0746929a7f8", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "434b80d8-fafa-41ae-96a4-433af9c8b5c2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a977675d-da7a-4852-af7b-a0746929a7f8");

            migrationBuilder.DropColumn(
                name: "ActivityFactor",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18cd35aa-b95c-4ebf-a981-863e5a41484d", null, "Admin", "ADMIN" },
                    { "32ad56e4-b54e-47a5-a456-b345f316358a", null, "User", "USER" }
                });
        }
    }
}
