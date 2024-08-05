using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pinewood.Customers.API.Models;
using Pinewood.Customers.Entities;
using Pinewood.Customers.Infrastructure.Data.Repositories;
using Pinewood.Customers.Models;

namespace Pinewood.Customers.API.Controllers
{
    [Route("api/customertypes", Name = "CustomerTypes")]
    [ApiController]
    public class CustomerTypesApiController : BaseApiController
    {

        #region constructors and dependencies

        private readonly ICustomerTypeRepository _customerTypeRepository;

        public CustomerTypesApiController(IMapper mapper, ICustomerTypeRepository customerTypeRepository)
            : base(mapper)
        {
            _customerTypeRepository = customerTypeRepository;
        }

        #endregion

        [HttpGet]
        public async Task<ApiResponseModel> GetAll(bool enabledOnly = true)
        {
            var result = await _customerTypeRepository.GetAllAsync();
            if (enabledOnly)
                result = result.Where(m => !m.IsDisabled).ToList();

            var responseResult = Mapper.Map<IList<CustomerTypeModel>>(result);

            return new ApiResponseModel(responseResult);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResponseModel> GetById(int id)
        {

            #region validation

            if(id <= 0)
                return new ApiResponseModel(false, "Unable to fetch Customer Type.");

            #endregion


            var result = await _customerTypeRepository.GetByIdAsync(id);
            if (result == null)
                return new ApiResponseModel(false, "Unable to fetch Customer Type.");

            var responseResult = Mapper.Map<CustomerTypeModel>(result);
            return new ApiResponseModel(responseResult);

        }

        [HttpPost]
        public async Task<ApiResponseModel> Post([FromBody] CustomerTypeModel postModel)
        {
            var entity = Mapper.Map<CustomerType>(postModel);
            entity.CreatedBy = "api";
            entity.ModifiedBy = "api";

            entity = await _customerTypeRepository.CreateAsync(entity);

            var responseResult = Mapper.Map<CustomerTypeModel>(entity);
            return new ApiResponseModel(responseResult);

        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ApiResponseModel> Put([FromBody] CustomerTypeModel model)
        {
            var entity = await _customerTypeRepository.GetByIdAsync(model.Id);
            if (entity == null)
                return new ApiResponseModel(false, "Unable to fetch Customer Type to update.");

            entity.Name = model.Name;
            entity.Description = model.Description;
            entity.OrderIndex = model.OrderIndex;
            entity.IsDisabled = model.IsDisabled;
            entity.ModifiedOn = DateTimeOffset.Now;
            entity.ModifiedBy = "api";

            await _customerTypeRepository.UpdateAsync(entity);

            var responseResult = Mapper.Map<CustomerTypeModel>(entity);
            return new ApiResponseModel(responseResult);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ApiResponseModel> Delete(int id)
        {

            var entity = await _customerTypeRepository.GetByIdAsync(id);
            if (entity == null)
                return new ApiResponseModel(false, "Unable to fetch Customer Type to delete.");

            await _customerTypeRepository.DeleteAsync(id);
            return new ApiResponseModel(true, "Customer Type deletion successful.");
        }

    }
}
