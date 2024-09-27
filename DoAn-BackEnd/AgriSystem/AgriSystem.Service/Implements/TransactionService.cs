using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Repository.MappingDtos;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Transaction;
using AgriSystem.Service.Interfaces;
using AgriSystem.Service.VNPayService;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace AgriSystem.Service.Implements
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly VnPayLibrary _vnpay = new VnPayLibrary();

        private const string VnpVersion = "vnp_Version";
        private const string VnpCommand = "vnp_Command";
        private const string VnpTmnCode = "vnp_TmnCode";
        private const string VnpAmount = "vnp_Amount";
        private const string VnpBankCode = "vnp_BankCode";
        private const string VnpCreateDate = "vnp_CreateDate";
        private const string VnpCurrCode = "vnp_CurrCode";
        private const string VnpIpAddr = "vnp_IpAddr";
        private const string VnpLocale = "vnp_Locale";
        private const string VnpOrderInfo = "vnp_OrderInfo";
        private const string VnpOrderType = "vnp_OrderType";
        private const string VnpReturnUrl = "vnp_ReturnUrl";
        private const string VnpTxnRef = "vnp_TxnRef";
        private const string VnpPrefix = "vnp_";
        private const string VnpTransactionNo = "vnp_TransactionNo";
        private const string VnpResponseCode = "vnp_ResponseCode";
        private const string VnpTransactionStatus = "vnp_TransactionStatus";
        private const string VnpSecureHash = "vnp_SecureHash";

        public TransactionService(ITransactionRepository transactionRepository, IUserRepository userRepository, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _transactionRepository = transactionRepository;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<PaginationResponse<Transaction>> GetAllTransactionsByUserIdAsync(PaginationTableRequest paginationRequest)
        {
            var transactionPagination = _mapper.Map<MappingPaginationTableRequest>(paginationRequest);

            var transactions = await _transactionRepository.GetAllTransactionsByUserIdAsync(transactionPagination);
            if (transactions is null)
            {
                throw new Exception("Không có giao dịch nào");
            }

            var response = new PaginationResponse<Transaction>
            {
                PageIndex = paginationRequest.Page,
                PageSize = paginationRequest.PageSize,
                TotalCount = transactions.TotalCount,
                Data = transactions.Data
            };

            return response;
        }

        public async Task<string> BeginTransactionAsync(BeginTransactionRequest newTransaction)
        {

            string vnp_Url = _configuration["VNPay:vnp_Url"];

            string vnp_Version = "2.1.0";
            string vnp_Command = "pay";
            string? vnp_TmnCode = _configuration["VNPay:vnp_TmnCode"];
            int vnp_Amount = newTransaction.vnp_Amount * 100;
            string vnp_BankCode = newTransaction.vnp_BankCode;
            string vnp_CreateDate = DateTime.Now.ToString("yyyyMMddHHmmss");
            string vnp_CurrCode = "VND";
            string vnp_IpAddr = Utils.GetIpAddress();
            string vnp_Locale = newTransaction.vnp_Locale;
            string vnp_OrderInfo = $"Khach hang ({newTransaction.UserId}) nap tien so tien {newTransaction.vnp_Amount.ToString()}đ";
            string vnp_OrderType = "other";
            string vnp_Returnurl = _configuration["VNPay:vnp_Returnurl"];
            string vnp_ExpireDate = DateTime.Now.AddDays(1).ToString("yyyyMMddHHmmss");
            string vnp_TxnRef = DateTime.Now.Ticks.ToString();
            string? vnp_SecureHash = _configuration["VNPay:vnp_HashSecret"];

            _vnpay.AddRequestData(VnpVersion, vnp_Version);
            _vnpay.AddRequestData(VnpCommand, vnp_Command);
            _vnpay.AddRequestData(VnpTmnCode, vnp_TmnCode);
            _vnpay.AddRequestData(VnpAmount, vnp_Amount.ToString());
            _vnpay.AddRequestData(VnpBankCode, vnp_BankCode);
            _vnpay.AddRequestData(VnpCreateDate, vnp_CreateDate);
            _vnpay.AddRequestData(VnpCurrCode, vnp_CurrCode);
            _vnpay.AddRequestData(VnpIpAddr, vnp_IpAddr);
            _vnpay.AddRequestData(VnpLocale, vnp_Locale);
            _vnpay.AddRequestData(VnpOrderInfo, vnp_OrderInfo);
            _vnpay.AddRequestData(VnpOrderType, vnp_OrderType);
            _vnpay.AddRequestData(VnpReturnUrl, vnp_Returnurl);
            _vnpay.AddRequestData(VnpTxnRef, vnp_TxnRef);

            string queryUrl = _vnpay.CreateRequestUrl(new Uri(vnp_Url!), vnp_SecureHash!);


            return queryUrl;
        }

        public async Task<bool> CreateTransactionAsync(CreateTransactionRequest newTransaction)
        {
            // create transaction
            //var transaction = _mapper.Map<Transaction>(newTransaction);
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = newTransaction.UserId,
                Money = newTransaction.Money,
                Status = newTransaction.Status
            };
            transaction.Id = Guid.NewGuid();
            var result = await _transactionRepository.CreateTransactionAsync(transaction);

            if (result == 0)
            {
                throw new Exception("Đã có lỗi xảy ra khi tạo giao dịch");
            }
            return result > 0;
        }

        public async Task<bool> UpdateUserBalanceAsync(Guid userId, int money)
        {
            // update balance
            var user = await _userRepository.GetUserByIdAsync(userId);
            user.AccountBalance += money;
            var result = await _userRepository.UpdateUserAsync(user);

            if (result == 0)
            {
                throw new Exception("Đã có lỗi xảy ra khi tạo giao dịch");
            }
            return result > 0;
        }
    }
}
