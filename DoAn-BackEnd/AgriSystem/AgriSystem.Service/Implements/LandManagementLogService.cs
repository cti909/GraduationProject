using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Service.Dtos.LandManagementLog;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class LandManagementLogService : ILandManagementLogService
    {
        private readonly ILandManagementLogRepository _landManagementLogRepository;
        private readonly ISubscribeRepository _subscribeRepository;
        private readonly ILandManagementRepository _landManagementRepository;
        private readonly IMapper _mapper;

        public LandManagementLogService(IMapper mapper, ILandManagementLogRepository landManagementLogRepository, ISubscribeRepository subscribeRepository, ILandManagementRepository landManagementRepository)
        {
            _mapper = mapper;
            _landManagementLogRepository = landManagementLogRepository;
            _subscribeRepository = subscribeRepository;
            _landManagementRepository = landManagementRepository;
        }

        /// <summary>
        /// Get All LandManagementLog - show detail current log plant growth
        /// farmer         /land-management/ceb60981-cca9-4e81-bcad-88e6c72a7215
        /// customer       /subscribe/b378ac31-ebff-4257-8859-e2ad702d3fc2
        /// </summary>
        public async Task<List<LandManagementLog>> GetAllLandManagementLogsDetailAsync(GetLandManagementLogRequest request)
        {
            Guid plantId = Guid.Empty;
            Guid landManagementId = Guid.Empty;
            Guid customerId = request.CustomerId;

            if (request.SubscribeId != Guid.Empty)
            {
                var subscribe = await _subscribeRepository.GetSubscribeByIdAsync(request.SubscribeId);
                if (subscribe is null)
                {
                    throw new Exception("Không tìm thấy đơn hàng");
                }
                if (subscribe.LandManagement.PlantId == null)
                {
                    //throw new Exception("Không có cây trồng trên mảnh đất");
                    plantId = Guid.Empty;
                    customerId = Guid.Empty;
                }
                else
                {
                    plantId = (Guid)subscribe.LandManagement.PlantId;
                    landManagementId = subscribe.LandManagementId;
                }
            }
            if (request.LandManagementId != Guid.Empty)
            {
                var landManagement = await _landManagementRepository.GetLandManagementByIdWithSubscribeAsync(request.LandManagementId);
                if (landManagement is null)
                {
                    throw new Exception("Không tìm thấy quản lý đất tương ứng");
                }
                if (landManagement.PlantId == null)
                {
                    //throw new Exception("Không có cây trồng trên mảnh đất");
                    plantId = Guid.Empty;
                    customerId = Guid.Empty;
                }
                else
                {
                    plantId = (Guid)landManagement.PlantId;
                    if (landManagement.IsTree == true)
                    {
                        if (landManagement.Subscribes.Count > 0 && landManagement.Subscribes.FirstOrDefault().RentedEndTime < DateTime.Now)
                        {
                            customerId = (Guid)landManagement.Subscribes.FirstOrDefault().UserId;
                        }
                        else
                        {
                            customerId = Guid.Empty;
                        }

                    }
                    else
                    {

                        customerId = (Guid)landManagement.Subscribes.FirstOrDefault().UserId;
                    }
                }
                landManagementId = request.LandManagementId;
            }

            var landManagementLogs = await _landManagementLogRepository.GetAllLandManagementLogsDetailAsync(plantId, landManagementId, customerId);
            if (landManagementLogs is null)
            {
                throw new Exception("Không có bản ghi nào");
            }

            return landManagementLogs;

        }

        public async Task<bool> UpdateLandManagementLogAsync(UpdateLandManagementLogRequest entity)
        {
            var landManagementLog = await _landManagementLogRepository.GetLandManagementLogsByIdAsync(entity.Id);
            if (landManagementLog == null)
            {
                throw new Exception("Không tìm thấy bản ghi");
            }

            landManagementLog.CompletionTime = DateTime.Now;
            landManagementLog.Status = 1; // Đã hoàn thành
            landManagementLog.Content = entity.Content;
            var result = await _landManagementLogRepository.UpdateLandManagementLogAsync(landManagementLog);

            if (result == 0)
            {
                throw new Exception("Cập nhật giai đoạn phát triển của cây thất bại");
            }
            return result > 0;
        }
    }
}
