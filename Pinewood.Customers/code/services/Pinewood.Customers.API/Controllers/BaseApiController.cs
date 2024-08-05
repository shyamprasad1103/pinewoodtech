using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Pinewood.Customers.API.Controllers
{
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMapper _mapper;
        protected BaseApiController(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected IMapper Mapper
        {
            get { return _mapper; }
        }

    }
}
