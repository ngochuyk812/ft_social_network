using AutoMapper;
using BE_SOCIALNETWORK.Database.Contracts;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Services.Interface;
using System.IO;
using System.Security.Claims;

namespace BE_SOCIALNETWORK.Mapping
{
    public class GetObjectByKeyS3 : IMemberValueResolver<Media, BaseModel, string, string>
    {
        private IS3Service s3Service;

        public GetObjectByKeyS3(IS3Service s3Service)
        {
            this.s3Service = s3Service;
        }

        public string Resolve(Media source, BaseModel destination, string sourceMember, string destMember, ResolutionContext context)
        {
            if(source.Type == "TEXT")
            {
                return sourceMember;
            }
            string path = s3Service.GetFileByKeyAsync(sourceMember);
            return path;
        }
    }
}
