using AgriSystem.Data.Entities;
using AgriSystem.Repository.Interfaces;
using AgriSystem.Service.Dtos.Province;
using AgriSystem.Service.Interfaces;
using AutoMapper;

namespace AgriSystem.Service.Implements
{
    public class ProvinceService : IProvinceService
    {
        private readonly IProvinceRepository _provinceRepository;
        private readonly IMapper _mapper;

        public ProvinceService(IProvinceRepository provinceRepository, IMapper mapper)
        {
            _provinceRepository = provinceRepository;
            _mapper = mapper;
        }

        public async Task<List<Province>> GetAllProvincesAsync()
        {
            var provinces = await _provinceRepository.GetAllProvincesAsync();
            if (provinces is null)
            {
                throw new Exception("Không có tỉnh thành nào");
            }
            return provinces;
        }

        public async Task<bool> CreateProvincesFromJsonAsync(ProvinceData provinceData)
        {
            var provinces = provinceData.Data.Select(p => new Province
            {
                //Id = int.Parse(p.Id),
                Name = p.Name,
                Latitude = float.Parse(p.Latitude),
                Longitude = float.Parse(p.Longitude)
            }).ToList();
            var result = await _provinceRepository.CreateListProvinceAsync(provinces);

            return result > 0;
        }
    }
}
