using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Service.Dtos.RecommendPlant;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class RecommendPlantService : IRecommendPlantService
    {
        private readonly IRecommendPlantRepository _recommendPlantRepository;
        private readonly ILandManagementRepository _landManagementRepository;
        private readonly IMapper _mapper;

        public RecommendPlantService(IRecommendPlantRepository recommendPlantRepository, ILandManagementRepository landManagementRepository, IMapper mapper)
        {
            _recommendPlantRepository = recommendPlantRepository;
            _landManagementRepository = landManagementRepository;
            _mapper = mapper;
        }

        // Xet theo SubscribeId
        public async Task<List<RecommendPlant>> GetAllRecommendPlantAsync(GetAllRecommendPlantRequest request)
        {
            Guid subscribeId = Guid.Empty;
            if (request.SubscribeId != Guid.Empty)
            {
                subscribeId = (Guid)request.SubscribeId;
            }
            else
            {
                var landManagement = await _landManagementRepository.GetLandManagementByIdAsync((Guid)request.LandManagementId);
                // Đất chưa thuê
                if (landManagement.Subscribes.Count != 0)
                {
                    subscribeId = landManagement!.Subscribes.FirstOrDefault()!.Id;
                }
            }
            var recommendPlants = await _recommendPlantRepository.GetAllRecommendPlantAsync(subscribeId);
            if (recommendPlants is null)
            {
                throw new Exception("Không có cây gợi ý nào");
            }
            return recommendPlants;
        }

        public async Task<bool> CreateRecommendPlantAsync(CreateRecommendPlantRequest request)
        {
            var landManagement = await _landManagementRepository.GetLandManagementByIdAsync(request.LandManagementId);
            RecommendPlant recommendPlant = null;
            if (landManagement is null)
            {
                throw new Exception("Không tìm thấy quản lý đặt tương ứng");
            }
            else
            {
                recommendPlant = new RecommendPlant
                {
                    SubscribeId = landManagement.Subscribes.FirstOrDefault().Id,
                    PlantId = request.PlantId
                };
            }

            var result = await _recommendPlantRepository.CreateRecommendPlantAsync(recommendPlant);

            return result > 0;
        }
    }
}
