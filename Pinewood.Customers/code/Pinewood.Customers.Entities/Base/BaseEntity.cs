namespace Pinewood.Customers.Entities
{
    public abstract class BaseEntity : IEntity
    {
        protected BaseEntity() { }

        public virtual bool IsTransient { get; } = true;

    }

    public abstract class BaseEntity<TId> : IEntity<TId>
        where TId : IComparable, IConvertible, IEquatable<TId>
    {
        protected BaseEntity() { }

        private TId _id = default;
        public virtual TId Id
        {
            get => _id;
            set => _id = value;
        }

        public virtual bool IsTransient
        {
            get => null == Id || Id.Equals(default);
        }
    }

    public abstract class AuditableEntity<TId> : BaseEntity<TId>, IAuditableEntity
        where TId : IComparable, IConvertible, IEquatable<TId>
    {
        protected AuditableEntity() { }

        private string _createdBy = string.Empty;
        public virtual string CreatedBy
        {
            get => _createdBy ?? (_createdBy = string.Empty);
            set => _createdBy = value;
        }

        public virtual DateTimeOffset CreatedOn { get; set; } = DateTimeOffset.Now;

        private string _modifiedBy = string.Empty;
        public virtual string ModifiedBy
        {
            get => _modifiedBy ?? (_modifiedBy = string.Empty);
            set => _modifiedBy = value;
        }

        public virtual DateTimeOffset ModifiedOn { get; set; } = DateTimeOffset.Now;

    }
}
