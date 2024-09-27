using AgriSystem.Service.Dtos.Base;
using AgriSystem.Service.Dtos.LandManagement;
using AgriSystem.Service.Dtos.Subscribe;
using AgriSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgriSystem.API.Controllers
{
    [Route("api/subscribe")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        private readonly ISubscribeService _subscribeService;

        public SubscribeController(ISubscribeService SubscribeService)
        {
            _subscribeService = SubscribeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubscribesByUserId([FromQuery] PaginationTableRequest paginationRequest)
        {
            try
            {
                var subscribes = await _subscribeService.GetAllSubscribesByUserIdAsync(paginationRequest);
                return Ok(subscribes);
            }
            catch (Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubscribeById(Guid id)
        {
            try
            {
                var Subscribe = await _subscribeService.GetSubscribeByIdAsync(id);
                return Ok(Subscribe);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Có gì đó không đúng");
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateSubscribe(CreateSubscribeRequest newSubscribe)
        {
            try
            {
                var result = await _subscribeService.CreateSubscribeAsync(newSubscribe);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("plant")]
        public async Task<IActionResult> CreateSubscribePlant(UpdateSubscribePlantRequest newSubscribe)
        {
            try
            {
                var result = await _subscribeService.UpdateSubscribePlantAsync(newSubscribe);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("cancelSubscribe")]
        public async Task<IActionResult> CancelSubscribe(CancelSubscribeRequest request)
        {
            try
            {
                var result = await _subscribeService.CancelSubscribeAsync(request);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateSubscribe(Guid id, UpdateSubscribeRequest editSubscribe)
        //{
        //    try
        //    {
        //        if (editSubscribe == null)
        //        {
        //            return BadRequest("Invalid Subscribe data or Subscribe number is missing.");
        //        }

        //        var result = await _subscribeService.UpdateSubscribeAsync(id, editSubscribe);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteSubscribe(Guid id)
        //{
        //    try
        //    {
        //        // set IsDelete = true
        //        var result = await _subscribeService.DeleteSubscribeAsync(id);
        //        return Ok(result);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest("Có gì đó không đúng");
        //    }
        //}
    }
}
