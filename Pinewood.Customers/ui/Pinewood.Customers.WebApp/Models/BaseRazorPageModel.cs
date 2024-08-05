using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Pinewood.Customers.WebApp.Models
{
    public class BaseRazorPageModel : PageModel
    {
        private readonly string _customersBaseUrl;

        public BaseRazorPageModel(string customersBaseUrl) 
        {
            _customersBaseUrl = customersBaseUrl;
        }

        public string CustomersBaseUrl
        {
            get => _customersBaseUrl;
        }
    }
}
