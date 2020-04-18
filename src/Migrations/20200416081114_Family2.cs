using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Family2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Users_UserId",
                table: "Families");

            migrationBuilder.DropIndex(
                name: "IX_Families_UserId",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Families");

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Families",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Families_CreatorId",
                table: "Families",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Families_Users_CreatorId",
                table: "Families",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Users_CreatorId",
                table: "Families");

            migrationBuilder.DropIndex(
                name: "IX_Families_CreatorId",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Families");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Families",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Families_UserId",
                table: "Families",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Families_Users_UserId",
                table: "Families",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
