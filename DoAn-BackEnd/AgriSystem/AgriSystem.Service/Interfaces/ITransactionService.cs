using AgriSystem.Data.Entities;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Transaction;

namespace AgriSystem.Service.Interfaces
{
    public interface ITransactionService
    {
        Task<PaginationResponse<Transaction>?> GetAllTransactionsByUserIdAsync(PaginationTableRequest paginationRequest);
        Task<string> BeginTransactionAsync(BeginTransactionRequest newTransaction);
        Task<bool> CreateTransactionAsync(CreateTransactionRequest newTransaction);
        Task<bool> UpdateUserBalanceAsync(Guid userId, int money);
    }
}
