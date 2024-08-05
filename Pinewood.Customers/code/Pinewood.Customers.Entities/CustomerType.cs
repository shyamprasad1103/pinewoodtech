using System.ComponentModel.DataAnnotations.Schema;

namespace Pinewood.Customers.Entities
{
    [Table("CustomerType")]
    public class CustomerType : AuditableEntity<int>
    {
        #region properties

        private string _name = string.Empty;
        public string Name
        {
            get { return _name ?? (_name = string.Empty); }
            set { _name = value; }
        }

        private string _description = string.Empty;
        public string Description
        {
            get { return _description ?? (_description = string.Empty); }
            set { _description = value; }
        }

        public int OrderIndex { get; set; }
        public bool IsDisabled { get; set; }

        #endregion
    }
}
