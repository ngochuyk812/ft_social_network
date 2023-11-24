using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using Microsoft.EntityFrameworkCore;

namespace BE_SOCIALNETWORK.Database
{
    public class Social_NetworkContext : DbContext
    {
        public Social_NetworkContext(DbContextOptions<Social_NetworkContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<LikeType> LikeType { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<MediaPost> MediaPost { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<MediaComment> MediaComment { get; set; }
        public DbSet<Friend> Friend { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<MediaMessage> MediaMessage { get; set; }
        public DbSet<Like> Like { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<Notification> Notification { get; set; }

        //CustomPostHome
        public DbSet<CustomPostHome> CustomPostHome { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomPostHome>()
                .HasMany(e => e.MediaPosts)
                .WithOne()
                .HasForeignKey(e => e.PostId)
                ;
            modelBuilder.Entity<Comment>()
            .HasOne(c => c.CommentParent)
            .WithMany()
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}