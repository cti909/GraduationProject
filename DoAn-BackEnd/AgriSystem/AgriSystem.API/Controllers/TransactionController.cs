using AgriSystem.Data.EnumStatus;
using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.Transaction;
using AgriSystem.Service.Interfaces;
using AgriSystem.Service.VNPayService;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace AgriSystem.API.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IConfiguration _configuration;


        public TransactionController(ITransactionService transactionService, IConfiguration configuration)
        {
            _transactionService = transactionService;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactionsByUserId([FromQuery] PaginationTableRequest paginationRequest)
        {
            try
            {
                var transactions = await _transactionService.GetAllTransactionsByUserIdAsync(paginationRequest);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpPost("begin")]
        public async Task<IActionResult> CreateTransaction(BeginTransactionRequest newTransaction)
        {
            try
            {
                var result = await _transactionService.BeginTransactionAsync(newTransaction);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Tạo giao dịch thất bại");
            }
        }

        [HttpGet("returnUrl")]
        public async Task<IActionResult> ReturnUrlTransaction()
        {
            try
            {
                string vnp_HashSecret = _configuration["VNPay:vnp_HashSecret"]!; //Chuoi bi mat
                var vnpayData = HttpContext.Request.Query;
                VnPayLibrary vnpay = new VnPayLibrary();
                Guid userId = Guid.Empty;

                foreach (var s in vnpayData)
                {
                    //get all querystring data
                    if (!string.IsNullOrEmpty(s.Key) && s.Key.StartsWith("vnp_"))
                    {
                        vnpay.AddResponseData(s.Key, s.Value!);
                    }
                }


                //vnp_TxnRef: Ma don hang merchant gui VNPAY tai command=pay    
                //vnp_TransactionNo: Ma GD tai he thong VNPAY
                //vnp_ResponseCode:Response code from VNPAY: 00: Thanh cong, Khac 00: Xem tai lieu
                //vnp_SecureHash: HmacSHA512 cua du lieu tra ve

                long orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
                long vnpayTranId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
                string vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
                string vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
                String vnp_SecureHash = vnpay.GetResponseData("vnp_SecureHash");
                String TerminalID = vnpay.GetResponseData("vnp_TmnCode");
                int vnp_Amount = Convert.ToInt32(vnpay.GetResponseData("vnp_Amount"))/100;
                String bankCode = vnpay.GetResponseData("vnp_BankCode");
                String vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");

                string pattern = @"\(([^)]+)\)";

                var match = Regex.Match(vnp_OrderInfo, pattern);
                if (match.Success)
                {
                    userId = Guid.Parse(match.Groups[1].Value);
                }

                bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);
                int status = (int)TransactionStatus.Failed;
                if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                {
                    status = (int)TransactionStatus.Success;
                    await _transactionService.UpdateUserBalanceAsync(userId, vnp_Amount);
                }

                await _transactionService.CreateTransactionAsync(new CreateTransactionRequest
                {
                    UserId = userId,
                    Status = status,
                    Money = vnp_Amount,

                });
                return Redirect("http://localhost:8080/transaction");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Tạo giao dịch thất bại");
            }
        }

    }
}
