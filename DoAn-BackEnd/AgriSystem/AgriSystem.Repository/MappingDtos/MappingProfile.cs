namespace AgriSystem.Repository.MappingDtos
{
    public class MappingPaginationRequest
    {
        public int TopSelect { get; set; } = 0;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public int Total { get; set; } = 0;
        public string? SearchValue { get; set; } = ""; // Name
        public string? SortBy { get; set; } = "Id";
        public string? SortType { get; set; } = "asc";

    }

    public class MappingPaginationTableRequest
    {
        public int TopSelect { get; set; } = 0;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public int Total { get; set; } = 0;
        public string? SortBy { get; set; } = "CreatedAt";
        public string? SortType { get; set; } = "desc";
        public Guid? UserId { get; set; } = Guid.Empty;

    }

    public class MappingPaginationResponse<T> where T : class
    {
        public IEnumerable<T> Data { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
    }

    public class MappingPlantPaginationRequest
    {
        public int TopSelect { get; set; } = 0;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public int Total { get; set; } = 0;
        public string? SearchValue { get; set; } = ""; // Name
        public string? SortBy { get; set; } = "Id";
        public string? SortType { get; set; } = "asc";
        public bool? IsPerennialTree { get; set; } // null -> all

    }
}
