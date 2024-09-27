using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.LandManagement;
using AgriSystem.Service.Dtos.Subscribe;

namespace AgriSystem.Service.Interfaces
{
    public interface ISubscribeService
    {
        Task<PaginationResponse<Subscribe>?> GetAllSubscribesByUserIdAsync(PaginationTableRequest paginationRequest);
        Task<Subscribe?> GetSubscribeByIdAsync(Guid id);
        Task<bool> CreateSubscribeAsync(CreateSubscribeRequest newSubscribe);
        Task<bool> CancelSubscribeAsync(CancelSubscribeRequest request);
        Task<bool> UpdateSubscribePlantAsync(UpdateSubscribePlantRequest newSubscribe);
        //Task<bool> UpdateSubscribeAsync(Guid SubscribeId, UpdateSubscribeRequest editSubscribe);
        //Task<bool> DeleteSubscribeAsync(Guid SubscribeId);
    }
}
