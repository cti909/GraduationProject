using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface ISubscribeRepository
    {
        Task<List<Subscribe>?> GetAllSubscribesAsync();
        Task<MappingPaginationResponse<Subscribe>?> GetAllSubscribesByUserIdAsync(MappingPaginationTableRequest paginationRequest);
        Task<Subscribe?> GetSubscribeByIdAsync(Guid id);
        Task<Subscribe?> GetSubscribeByIdBasicAsync(Guid id);
        Task<int> CreateSubscribeAsync(Subscribe entity);
        Task<int> UpdateSubscribeAsync(Subscribe entity);
        Task<int> DeleteSubscribeAsync(Subscribe entity);
    }
}
