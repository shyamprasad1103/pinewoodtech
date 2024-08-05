using System.ComponentModel.DataAnnotations.Schema;

namespace Pinewood.Customers.Entities
{
    [Table("Customer")]
    public class Customer : AuditableEntity<int>
    {
        #region properties

        private string _key = string.Empty;
        public string Key
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_key))
                {
                    _key = string.Format("cstmr_{0}", Guid.NewGuid().ToString("N").ToLower());
                }

                return _key;
            }
            set { _key = value; }
        }

        public int TypeId { get; set; }

        private string _title = string.Empty;
        public string Title
        {
            get { return _title ?? (_title = string.Empty); }
            set { _title = value; }
        }

        private string _firstName = string.Empty;
        public string FirstName
        {
            get { return _firstName ?? (_firstName = string.Empty); }
            set { _firstName = value; }
        }

        private string _lastName = string.Empty;
        public string LastName
        {
            get { return _lastName ?? (_lastName = string.Empty); }
            set { _lastName = value; }
        }

        private string _email = string.Empty;
        public string Email
        {
            get { return _email ?? (_email = string.Empty); }
            set { _email = value; }
        }

        private string _mobilePhone = string.Empty;
        public string MobilePhone
        {
            get { return _mobilePhone ?? (_mobilePhone = string.Empty); }
            set { _mobilePhone = value; }
        }

        public bool IsDisabled { get; set; }
        public bool IsLocked { get; set; }
        public DateTimeOffset? LockedOn { get; set; } = null;

        #endregion
    }
}
