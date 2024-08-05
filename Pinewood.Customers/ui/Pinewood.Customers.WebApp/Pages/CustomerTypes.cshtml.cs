using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Pinewood.Customers.WebApp.Models;

namespace Pinewood.Customers.WebApp.Pages
{
    public class CustomerTypesModel : BaseRazorPageModel
    {
        public CustomerTypesModel(string customersBaseUrl) : base(customersBaseUrl) 
        { }

        public void OnGet()
        {
        }
    }
}
