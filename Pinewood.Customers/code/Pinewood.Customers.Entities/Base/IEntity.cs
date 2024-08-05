namespace Pinewood.Customers.Entities
{
    public interface IEntity
    {
        bool IsTransient { get; }
    }

    public interface IEntity<TId> : IEntity
        where TId : IComparable, IConvertible, IEquatable<TId>
    {
        TId Id { get; set; }
    }

    public interface IAuditableEntity : IEntity
    {
        string CreatedBy { get; set; }
        DateTimeOffset CreatedOn { get; set; }
        string ModifiedBy { get; set; }
        DateTimeOffset ModifiedOn { get; set; }
    }
}
