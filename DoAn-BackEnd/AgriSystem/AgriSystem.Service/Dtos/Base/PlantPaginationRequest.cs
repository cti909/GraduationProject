namespace AgriSystem.Service.Dtos.Base
{
    public class PlantPaginationRequest
    {
        public int TopSelect { get; set; } = 0;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string? SearchValue { get; set; } = ""; // Name
        public string? SortBy { get; set; } = "Id";
        public string? SortType { get; set; } = "asc";
        public bool? IsPerennialTree { get; set; } // null -> all
    }
}
