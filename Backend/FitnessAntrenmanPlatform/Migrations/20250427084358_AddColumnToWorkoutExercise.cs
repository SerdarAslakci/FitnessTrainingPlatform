using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitnessAntrenmanPlatform.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnToWorkoutExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "434b80d8-fafa-41ae-96a4-433af9c8b5c2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a977675d-da7a-4852-af7b-a0746929a7f8");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "WorkoutExercises",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MuscleGroup",
                table: "WorkoutExercises",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "045bdb74-42d9-47b0-a936-b5ce6cda20a4", null, "Admin", "ADMIN" },
                    { "f901bf8c-cd21-4201-8f7d-76b59a35f28a", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "045bdb74-42d9-47b0-a936-b5ce6cda20a4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f901bf8c-cd21-4201-8f7d-76b59a35f28a");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "MuscleGroup",
                table: "WorkoutExercises");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "434b80d8-fafa-41ae-96a4-433af9c8b5c2", null, "User", "USER" },
                    { "a977675d-da7a-4852-af7b-a0746929a7f8", null, "Admin", "ADMIN" }
                });
        }
    }
}
