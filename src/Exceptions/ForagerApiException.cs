using System;
using System.Collections.Generic;

namespace Forager.Exceptions
{
  [Serializable]
  public class ForagerApiException : Exception
  {
    private static IDictionary<ForagerApiExceptionCode, string> messages = new Dictionary<ForagerApiExceptionCode, string>
    {
      { ForagerApiExceptionCode.InvitationNotFound, "No invitation could be found for the Id provided. The invitation may already have been accepted or rejected." },
      { ForagerApiExceptionCode.UserNotFound, "No user could be found for the credentials provided." },
      { ForagerApiExceptionCode.FamilyNotFound, "No family could be found for the Id provided." },
      { ForagerApiExceptionCode.InvalidNameProvided, "An invalid name was provided for this entity." },
      { ForagerApiExceptionCode.InvalidEmailProvided, "An invalid email address was provided for this entity." },
      { ForagerApiExceptionCode.ListNotFound, "No list could be found for the Id provided." },
      { ForagerApiExceptionCode.ProductNotFound, "No product could be found for the Id provided." },
      { ForagerApiExceptionCode.InvalidNumberFormat, "An invalid number was supplied for this parameter." },
      { ForagerApiExceptionCode.VariantNotFound, "No Variant could be found for the Id provided." }
    };

    public ForagerApiException(ForagerApiExceptionCode code) : base(messages[code])
    {
      Code = code;
    }

    public ForagerApiException(ForagerApiExceptionCode code, Exception innerException) : base(messages[code], innerException)
    {
      Code = code;
    }

    public ForagerApiExceptionCode Code { get; }
  }

  public enum ForagerApiExceptionCode
  {
    InvitationNotFound = 1001,
    UserNotFound = 1002,
    FamilyNotFound = 1003,
    InvalidNameProvided = 1004,
    InvalidEmailProvided = 1005,
    ListNotFound = 1006,
    ProductNotFound = 1007,
    InvalidNumberFormat = 1008,
    VariantNotFound = 1009
  }
}
