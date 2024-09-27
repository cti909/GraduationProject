namespace AgriSystem.Service.Dtos.Base
{
    public class PaginationTableRequest
    {
        public int TopSelect { get; set; } = 0;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public int Total { get; set; } = 0;
        public string? SortBy { get; set; } = "CreatedAt";
        public string? SortType { get; set; } = "desc";
        public Guid? UserId { get; set; } = Guid.Empty;
    }
}
