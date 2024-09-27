namespace AgriSystem.Service.Dtos.Province
{
    public class ProvinceJson
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Name_en { get; set; }
        public string Full_name { get; set; }
        public string Full_name_en { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }

    public class ProvinceData
    {
        public int Error { get; set; }
        public string Error_text { get; set; }
        public string Data_name { get; set; }
        public List<ProvinceJson> Data { get; set; }
    }
}
