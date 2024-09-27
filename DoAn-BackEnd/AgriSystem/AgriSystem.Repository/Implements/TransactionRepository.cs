using AgriSystem.Data;
using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using Microsoft.EntityFrameworkCore;

namespace AgriSystem.Repository.Implements
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AgriSystemContext _context;
        public TransactionRepository(AgriSystemContext context)
        {
            _context = context;
        }

        public async Task<MappingPaginationResponse<Transaction>?> GetAllTransactionsByUserIdAsync(MappingPaginationTableRequest paginationRequest)
        {
            var transactions = await _context.Transactions!
                .Include(item => item.User)
                .Where(item => item.UserId == paginationRequest.UserId)
                .Select(item => new Transaction
                {
                    Id = item.Id,
                    Money = item.Money,
                    Status = item.Status,
                    UserId = item.UserId,
                    CreatedAt = item.CreatedAt,
                    User = new UserApp
                    {
                        Id = item.User.Id,
                        Name = item.User.Name,
                        Email = item.User.Email,
                        PhoneNumber = item.User.PhoneNumber
                    }
                })
            .ToListAsync();

            var totalCount = transactions.Count;

            var entityProperty = transactions.GetType().GetProperty(paginationRequest.SortBy!);

            if (paginationRequest.SortType == "desc")
            {
                transactions = transactions.OrderByDescending(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            else
            {
                transactions = transactions.OrderBy(e => e.GetType().GetProperty(paginationRequest.SortBy!)!.GetValue(e)).ToList();
            }
            transactions = transactions.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize).ToList();

            // slide homepage
            if (paginationRequest.TopSelect != 0)
            {
                transactions = transactions.Take(paginationRequest.TopSelect).ToList();
            }

            var response = new MappingPaginationResponse<Transaction>
            {
                TotalCount = totalCount,
                Data = transactions
            };

            return response;
        }

        public async Task<int> CreateTransactionAsync(Transaction newTransaction)
        {
            await _context.Transactions!.AddAsync(newTransaction);
            return await _context.SaveChangesAsync();
        }
    }
}
