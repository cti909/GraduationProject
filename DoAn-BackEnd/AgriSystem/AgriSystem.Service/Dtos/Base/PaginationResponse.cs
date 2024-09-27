namespace AgriSystem.Service.Dtos.Base
{
    public class PaginationResponse<T> where T : class
    {
        public IEnumerable<T>? Data { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 1;
        public int TotalCount { get; set; } = 0;
    }
}
