using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitnessAntrenmanPlatform.Migrations
{
    /// <inheritdoc />
    public partial class DropColumnFromWorkoutExerciseTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b8b7d17c-9f3b-48c6-b4c6-11d26b5b3c8e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dda0db06-eacf-4616-a862-d0af0a6ac5fd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5f0fb2aa-ed61-46e0-b2ca-53acf252d4f6", null, "User", "USER" },
                    { "f5fb957e-7470-4272-8723-a7d028097cac", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5f0fb2aa-ed61-46e0-b2ca-53acf252d4f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5fb957e-7470-4272-8723-a7d028097cac");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b8b7d17c-9f3b-48c6-b4c6-11d26b5b3c8e", null, "User", "USER" },
                    { "dda0db06-eacf-4616-a862-d0af0a6ac5fd", null, "Admin", "ADMIN" }
                });
        }
    }
}
