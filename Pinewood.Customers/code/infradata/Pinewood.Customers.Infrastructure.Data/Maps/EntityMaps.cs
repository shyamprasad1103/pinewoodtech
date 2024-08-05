//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using Pinewood.Customers.Entities;
//using Microsoft.EntityFrameworkCore.Tools;

//namespace Pinewood.Customers.Infrastructure.Data.Maps
//{
//    internal class CustomerTypeMap : IEntityTypeConfiguration<CustomerType>
//    {
//        public void Configure(EntityTypeBuilder<CustomerType> builder)
//        {
//            builder.HasKey(x => x.Id);
//            builder.ToTable("CustomerType");
//        }
//    }

//    internal class ManagedNodeTypeMap : IEntityTypeConfiguration<Customer>
//    {
//        public void Configure(EntityTypeBuilder<Customer> builder)
//        {
//            builder.HasKey(m => m.Id);
//            builder.ToTable("Customer");
//        }
//    }

//}
