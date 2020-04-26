using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Family6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Families",
                columns: new[] { "Id", "CreatedById", "CreatedOn", "Name" },
                values: new object[] { 1, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Universal Family" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Families",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
