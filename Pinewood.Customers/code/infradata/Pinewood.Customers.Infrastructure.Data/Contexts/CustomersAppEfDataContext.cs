using Microsoft.EntityFrameworkCore;
using Pinewood.Customers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Pinewood.Customers.Infrastructure.Data
{
    public class CustomersAppEfDataContext : DbContext
    {
        public CustomersAppEfDataContext(DbContextOptions<CustomersAppEfDataContext> options) : base(options) { }

        public DbSet<CustomerType> CustomerTypes { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
