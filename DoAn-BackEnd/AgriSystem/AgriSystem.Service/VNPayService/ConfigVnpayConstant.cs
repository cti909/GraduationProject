using Microsoft.Extensions.Configuration;

namespace AgriSystem.Service.VNPayService
{
    public class ConfigVnpayConstant
    {
        public ConfigVnpayConstant(IConfiguration configuration)
        {
            ReturnUrl = configuration["VNPay:vnp_Returnurl"];
            Url = configuration["VNPay:vnp_Url"];
            TmnCode = configuration["VNPay:vnp_TmnCode"];
            HashSecret = configuration["VNPay:vnp_HashSecret"];
            IpAddr = Utils.GetIpAddress();
        }

        public static string ReturnUrl { get; private set; }
        public static string Url { get; private set; }
        public static string TmnCode { get; private set; }
        public static string HashSecret { get; private set; }
        public static string Version { get; private set; } = VnPayLibrary.VERSION;
        public const string Command = "Pay";
        public const string BankCode = "VNBANK";
        public const string OrderType = "other";
        public static string CreateDate { get; private set; } = DateTime.Now.ToString("yyyyMMddHHmmss");
        public const string CurrCode = "VND";
        public static string IpAddr { get; private set; }
        public const string Locale = "vn";
        public const string Successed = "00";


    }
}
