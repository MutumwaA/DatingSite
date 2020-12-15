using System.Linq;
using AutoMapper;
using DattingApp.API.Dtos;
using DattingApp.API.Models;

namespace DattingApp.API.Helper
{
    public class  AutoMapperProfile : Profile
    {
     public AutoMapperProfile()
        {
         CreateMap<User, UserForDetailedDto>()
         .ForMember(dest => dest.PhotoUrl, opt => {
               opt.MapFrom(scr => scr.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt => {
               opt.MapFrom(d => d.DateOfBirth.CalculateAge());
               });
          CreateMap<User, UserForListDto>()
          .ForMember(dest => dest.PhotoUrl, opt => {
               opt.MapFrom(scr => scr.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt => {
               opt.MapFrom(d => d.DateOfBirth.CalculateAge());
               });
         CreateMap<Photo, PhotosForDetailedDto>();  
         CreateMap<UserForUpdateDto, User>(); 
        }
    }
}
