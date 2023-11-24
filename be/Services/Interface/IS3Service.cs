using Amazon.S3;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface IS3Service
    {
        Task<MediaDto> UploadFileToS3(IFormFile myfile, string subFolder = "", string name = null, S3CannedACL role = null);
        Task<List<MediaDto>> UploadFilesToS3(List<IFormFile> files, string subFolder);
        Task<bool> RemoveFile(List<string> files);
        string GetFileByKeyAsync(string key, long timeOut = 10);
    }
}
