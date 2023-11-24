using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_SOCIALNETWORK.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNotificationV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Comment_CommentID",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Friend_FriendId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Like_LikeId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Message_MessageId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_CommentID",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_FriendId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_LikeId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_MessageId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "CommentID",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "FriendId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "LikeId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "MessageId",
                table: "Notification");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Notification",
                newName: "ToId");

            migrationBuilder.AddColumn<int>(
                name: "FromId",
                table: "Notification",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdObj",
                table: "Notification",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notification_FromId",
                table: "Notification",
                column: "FromId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_ToId",
                table: "Notification",
                column: "ToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_User_FromId",
                table: "Notification",
                column: "FromId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_User_ToId",
                table: "Notification",
                column: "ToId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_User_FromId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_User_ToId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_FromId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_ToId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "FromId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "IdObj",
                table: "Notification");

            migrationBuilder.RenameColumn(
                name: "ToId",
                table: "Notification",
                newName: "UserID");

            migrationBuilder.AddColumn<int>(
                name: "CommentID",
                table: "Notification",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FriendId",
                table: "Notification",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LikeId",
                table: "Notification",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MessageId",
                table: "Notification",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notification_CommentID",
                table: "Notification",
                column: "CommentID");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_FriendId",
                table: "Notification",
                column: "FriendId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_LikeId",
                table: "Notification",
                column: "LikeId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_MessageId",
                table: "Notification",
                column: "MessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Comment_CommentID",
                table: "Notification",
                column: "CommentID",
                principalTable: "Comment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Friend_FriendId",
                table: "Notification",
                column: "FriendId",
                principalTable: "Friend",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Like_LikeId",
                table: "Notification",
                column: "LikeId",
                principalTable: "Like",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Message_MessageId",
                table: "Notification",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id");
        }
    }
}
