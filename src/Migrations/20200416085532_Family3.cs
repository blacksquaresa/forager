using Microsoft.EntityFrameworkCore.Migrations;

namespace forager.Migrations
{
    public partial class Family3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFamilies",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    FamilyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFamilies", x => new { x.UserId, x.FamilyId });
                    table.ForeignKey(
                        name: "FK_UserFamilies_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFamilies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFamilies_FamilyId",
                table: "UserFamilies",
                column: "FamilyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFamilies");
        }
    }
}
