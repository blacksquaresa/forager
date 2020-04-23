﻿// <auto-generated />
using System;
using Forager.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Forager.Migrations
{
    [DbContext(typeof(ForagerContext))]
    [Migration("20200423183619_Product1")]
    partial class Product1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Forager.Data.Family", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatorId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Families");
                });

            modelBuilder.Entity("Forager.Data.Invitation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FamilyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("InvitedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ResolvedOn")
                        .HasColumnType("datetime2");

                    b.Property<int?>("SourceId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FamilyId");

                    b.HasIndex("SourceId");

                    b.ToTable("Invitations");
                });

            modelBuilder.Entity("Forager.Data.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Forager.Data.ShoppingList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FamilyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FamilyId");

                    b.ToTable("Lists");
                });

            modelBuilder.Entity("Forager.Data.Source", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("VariantId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VariantId");

                    b.ToTable("Sources");
                });

            modelBuilder.Entity("Forager.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Picture")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Forager.Data.UserFamily", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("FamilyId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "FamilyId");

                    b.HasIndex("FamilyId");

                    b.ToTable("UserFamilies");
                });

            modelBuilder.Entity("Forager.Data.Variant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackagingType")
                        .HasColumnType("int");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Units")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Variant");
                });

            modelBuilder.Entity("Forager.Data.Invitation", b =>
                {
                    b.HasOne("Forager.Data.Family", "Family")
                        .WithMany()
                        .HasForeignKey("FamilyId");

                    b.HasOne("Forager.Data.User", "Source")
                        .WithMany()
                        .HasForeignKey("SourceId");
                });

            modelBuilder.Entity("Forager.Data.ShoppingList", b =>
                {
                    b.HasOne("Forager.Data.Family", "Family")
                        .WithMany("Lists")
                        .HasForeignKey("FamilyId");
                });

            modelBuilder.Entity("Forager.Data.Source", b =>
                {
                    b.HasOne("Forager.Data.Variant", null)
                        .WithMany("Sources")
                        .HasForeignKey("VariantId");
                });

            modelBuilder.Entity("Forager.Data.UserFamily", b =>
                {
                    b.HasOne("Forager.Data.Family", "Family")
                        .WithMany("UserFamilies")
                        .HasForeignKey("FamilyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Forager.Data.User", "User")
                        .WithMany("UserFamilies")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Forager.Data.Variant", b =>
                {
                    b.HasOne("Forager.Data.Product", "Product")
                        .WithMany("Variants")
                        .HasForeignKey("ProductId");
                });
#pragma warning restore 612, 618
        }
    }
}
