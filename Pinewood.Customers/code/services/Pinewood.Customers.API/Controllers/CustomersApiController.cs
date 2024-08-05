using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pinewood.Customers.API.Models;
using Pinewood.Customers.Entities;
using Pinewood.Customers.Infrastructure.Data.Repositories;
using Pinewood.Customers.Models;

namespace Pinewood.Customers.API.Controllers
{
    [Route("api/customers", Name = "Customers")]
    [ApiController]
    public class CustomersApiController : BaseApiController
    {

        #region constructors and dependencies

        private readonly ICustomerRepository _customerRepository;

        public CustomersApiController(IMapper mapper, ICustomerRepository customerRepository)
            : base(mapper)
        {
            _customerRepository = customerRepository;
        }

        #endregion

        [HttpGet]
        public async Task<ApiResponseModel> GetAll(bool enabledOnly = true)
        {
            var result = await _customerRepository.GetAllAsync();
            if (enabledOnly)
                result = result.Where(m => !m.IsDisabled).ToList();

            var responseResult = Mapper.Map<IList<CustomerModel>>(result);
            return new ApiResponseModel(responseResult);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResponseModel> GetById(int id)
        {
            #region validation

            if (id <= 0)
                return new ApiResponseModel(false, "Unable to fetch Customer.");

            #endregion

            var result = await _customerRepository.GetByIdAsync(id);
            if (result == null)
                return new ApiResponseModel(false, "Unable to fetch Customer.");

            var responseResult = Mapper.Map<CustomerModel>(result);
            return new ApiResponseModel(responseResult);
        }

        [HttpPost]
        public async Task<ApiResponseModel> Post([FromBody] CustomerModel model)
        {
            model.Key = string.Empty;

            var entity = Mapper.Map<Customer>(model);
            entity.LockedOn = model.IsLocked ? DateTimeOffset.Now : null;
            entity.CreatedBy = "api";
            entity.ModifiedBy = "api";

            entity = await _customerRepository.CreateAsync(entity);

            var responseResult = Mapper.Map<CustomerModel>(entity);
            return new ApiResponseModel(responseResult);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ApiResponseModel> Put([FromBody] CustomerModel model)
        {

            var entity = await _customerRepository.GetByIdAsync(model.Id);
            if (entity == null)
                return new ApiResponseModel(false, "Unable to fetch Customer.");

            entity.TypeId = model.TypeId;
            entity.Title = model.Title;
            entity.FirstName = model.FirstName;
            entity.TypeId = model.TypeId;
            entity.TypeId = model.TypeId;
            entity.LastName = model.LastName;
            entity.Email = model.Email;
            entity.MobilePhone = model.MobilePhone;
            entity.IsDisabled = model.IsDisabled;
            entity.IsLocked = model.IsLocked;
            entity.LockedOn = model.IsLocked ? DateTimeOffset.Now : null;
            entity.ModifiedOn = DateTimeOffset.Now;
            entity.ModifiedBy = "api";

            await _customerRepository.UpdateAsync(entity);

            var responseResult = Mapper.Map<CustomerModel>(entity);
            return new ApiResponseModel(responseResult);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ApiResponseModel> Delete(int id)
        {
            var entity = await _customerRepository.GetByIdAsync(id);
            if (entity == null)
                return new ApiResponseModel(false, "Unable to fetch Customer to delete.");

            await _customerRepository.DeleteAsync(id);
            return new ApiResponseModel(true, "Customer deletion successful.");
        }

    }
}
