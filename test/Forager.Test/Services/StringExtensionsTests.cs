using FluentAssertions;
using NUnit.Framework;
using System.Collections.Generic;

namespace Forager.Services
{
  public class StringExtensionsTests
  {
    #region IsValidEmail
    [TestCaseSource(nameof(IsValidEmail_Sources))]
    public void IsValidEmail_ReturnsCorrectResult(string email, bool expected)
    {
      email.IsValidEmail().Should().Be(expected);
    }

    public static IEnumerable<TestCaseData> IsValidEmail_Sources() {
      yield return new TestCaseData("", false);
      yield return new TestCaseData("   ", false);
      yield return new TestCaseData(null, false);
      yield return new TestCaseData("not an email address", false);
      yield return new TestCaseData("an.email@address.com", true);
      yield return new TestCaseData(" an.email@address.com  ", true);
      yield return new TestCaseData("email@com", true);
    }
    #endregion
  }
}
