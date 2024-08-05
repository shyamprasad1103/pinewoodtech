using System.Collections.ObjectModel;

namespace Pinewood.Customers.API.Models
{
    public class ApiResponseModel
    {
        #region constructors

        public ApiResponseModel() { }

        public ApiResponseModel(object result) 
            : this(result, true, string.Empty)
        {
        }

        public ApiResponseModel(bool success, string message) 
            : this(null, success, message)
        {
        }

        public ApiResponseModel(object? result, bool success, string message) 
            : this(result, success, message, new Collection<string>())
        {

        }

        public ApiResponseModel(object? result, bool success, string message, IList<string> errors)
        {
            Result = result;
            Success = success;
            Message = message;
            Errors = errors;
        }

        #endregion

        public object? Result { get; set; }
        public bool Success { get; set; } = true;
        public string Message { get; set; } = string.Empty;
        public IList<string> Errors { get; set; } = new Collection<string>();
    }
}
