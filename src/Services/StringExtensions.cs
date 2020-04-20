using System.ComponentModel.DataAnnotations;

namespace Forager.Services
{
  public static class StringExtensions
  {
    public static bool IsValidEmail(this string email){
      if (string.IsNullOrWhiteSpace(email)){
        return false;
      }

      var trimmed = email.Trim();
      var validator = new EmailAddressAttribute();
      return validator.IsValid(trimmed);
    }
  }
}
