using Microsoft.EntityFrameworkCore.Migrations;

namespace forager.Migrations
{
    public partial class Family4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Users_CreatorId",
                table: "Families");

            migrationBuilder.DropIndex(
                name: "IX_Families_CreatorId",
                table: "Families");

            migrationBuilder.AlterColumn<int>(
                name: "CreatorId",
                table: "Families",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CreatorId",
                table: "Families",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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
    }
}
