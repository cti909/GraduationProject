using AgriSystem.Data.Entities;
using AgriSystem.Repository.MappingDtos;

namespace AgriSystem.Repository.Interfaces
{
    public interface ITransactionRepository
    {
        Task<MappingPaginationResponse<Transaction>?> GetAllTransactionsByUserIdAsync(MappingPaginationTableRequest paginationRequest);
        Task<int> CreateTransactionAsync(Transaction entity);
    }
}
