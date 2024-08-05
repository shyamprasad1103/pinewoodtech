using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Pinewood.Customers.WebApp.Models;

namespace Pinewood.Customers.WebApp.Pages
{
    public class CustomersModel : BaseRazorPageModel
    {
        public CustomersModel(string customersBaseUrl) : base(customersBaseUrl)
        { }

        public void OnGet()
        {
        }
    }
}
