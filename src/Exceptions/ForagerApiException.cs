﻿using System;
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
      { ForagerApiExceptionCode.FamilyNotFound, "No family could be found for the Id provided." }
    };

    public ForagerApiException(ForagerApiExceptionCode code) : base(messages[code])
    {
      Code = code;
    }

    public ForagerApiExceptionCode Code { get; }
  }

  public enum ForagerApiExceptionCode
  {
    InvitationNotFound = 1001,
    UserNotFound = 1002,
    FamilyNotFound = 1003
  }
}
