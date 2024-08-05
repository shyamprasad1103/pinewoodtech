using System.ComponentModel.DataAnnotations.Schema;

namespace Pinewood.Customers.Models
{
    public class CustomerTypeModel
    {
        #region properties

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int OrderIndex { get; set; }
        public bool IsDisabled { get; set; } = false;

        #endregion
    }
}
