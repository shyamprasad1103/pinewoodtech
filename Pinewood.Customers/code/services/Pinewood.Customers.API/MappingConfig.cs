using AutoMapper;
using Pinewood.Customers.Entities;
using Pinewood.Customers.Models;

namespace Pinewood.Customers.API
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterTypes()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CustomerType, CustomerTypeModel>();
                config.CreateMap<Customer, CustomerModel>();
                config.CreateMap<CustomerTypeModel, CustomerType>();
                config.CreateMap<CustomerModel, Customer>();
            });

            return mappingConfig;
        }

    }
}
