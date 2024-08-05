using Pinewood.Customers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pinewood.Customers.Infrastructure.Data.Repositories
{
    public class CustomerTypeRepository : BaseRepository<CustomerType>, ICustomerTypeRepository
    {
        public CustomerTypeRepository(CustomersAppEfDataContext appDbContext) : base(appDbContext)
        {
        }
    }
}
