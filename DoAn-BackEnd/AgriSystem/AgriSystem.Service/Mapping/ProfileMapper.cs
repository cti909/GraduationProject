using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Auth;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.LandManagement;
using AgriSystem.Service.Dtos.LandManagementLog;
using AgriSystem.Service.Dtos.Plant;
using AgriSystem.Service.Dtos.PlantDisease;
using AgriSystem.Service.Dtos.Subscribe;
using AgriSystem.Service.Dtos.Transaction;
using AutoMapper;

namespace AgriSystem.Service.Mapping
{
    public class ProfileMapper : Profile
    {
        public ProfileMapper()
        {
            // user & auth
            CreateMap<UserApp, RegisterRequest>().ReverseMap();
            CreateMap<UserApp, UserDto>().ReverseMap();

            // plant
            CreateMap<Plant, CreatePlantRequest>().ReverseMap();

            // land management
            CreateMap<LandManagement, CreateLandManagementRequest>().ReverseMap();
            CreateMap<LandManagement, UpdateLandManagementRequest>().ReverseMap();

            // land management log
            CreateMap<LandManagementLog, UpdateLandManagementLogRequest>().ReverseMap();

            // subscribe
            CreateMap<Subscribe, CreateSubscribeRequest>().ReverseMap();


            // plant disease management
            CreateMap<PlantDisease, CreatePlantDiseaseRequest>().ReverseMap();

            // Transaction
            CreateMap<Transaction, CreateTransactionRequest>().ReverseMap();

            // Recommend Plant
            //CreateMap<RecommendPlant, CreateRecommendPlantRequest>().ReverseMap();

            // common
            CreateMap<PaginationRequest, MappingPaginationRequest>().ReverseMap();
            CreateMap<PlantPaginationRequest, MappingPlantPaginationRequest>().ReverseMap();
            CreateMap<PaginationTableRequest, MappingPaginationTableRequest>().ReverseMap();
            //CreateMap<PaginationResponse<object>, MappingPaginationResponse<object>>().ReverseMap();
        }
    }
}
