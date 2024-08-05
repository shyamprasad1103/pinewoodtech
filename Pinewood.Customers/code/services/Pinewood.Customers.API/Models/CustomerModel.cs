using System.ComponentModel.DataAnnotations.Schema;

namespace Pinewood.Customers.Models
{
    public class CustomerModel
    {
        #region properties

        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public int TypeId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobilePhone { get; set; } = string.Empty;
        public bool IsDisabled { get; set; }
        public bool IsLocked { get; set; }
        public DateTimeOffset? LockedOn { get; set; } = null;

        #endregion
    }
}
