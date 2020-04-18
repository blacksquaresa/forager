using NSubstitute;
using NUnit.Framework;
using Microsoft.AspNetCore.Authentication;
using System;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Security.Claims;
using FluentAssertions;
using System.Security.Principal;

namespace Forager.Authentication
{
  public class AuthenticateSPAFilesTests
  {
    HttpRequest _request;
    ClaimsPrincipal _user;
    IIdentity _identity;
    Func<AuthenticationProperties, Task> _challenge;
    Func<Task> _next;
    AuthenticationProperties _challengeProperties;
    bool _nextWasCalled;

    [SetUp]
    public void Setup()
    {
      _request = Substitute.For<HttpRequest>();
      _user = Substitute.For<ClaimsPrincipal>();
      _identity = Substitute.For<IIdentity>();
      _user.Identity.Returns(_identity);
      _nextWasCalled = false;
      _next = () => { _nextWasCalled = true; return Task.CompletedTask; };
      _challengeProperties = null;
      _challenge = (properties) => { _challengeProperties = properties; return Task.CompletedTask; };
    }

    [Test]
    public async Task RequestsStartingWithApiPassThrough()
    {
      _request.Path.Returns(new PathString("/api/path/to/somewhere"));
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeTrue();
      _challengeProperties.Should().BeNull();
    }

    [Test]
    public async Task RequestsStartingWithStaticPassThrough()
    {
      _request.Path.Returns(new PathString("/static/path/to/somewhere"));
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeTrue();
      _challengeProperties.Should().BeNull();
    }

    [Test]
    public async Task RequestsAsApiPassThrough()
    {
      _request.Path.Returns(new PathString("/api"));
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeTrue();
      _challengeProperties.Should().BeNull();
    }

    [Test]
    public async Task RequestsAsStaticPassThrough()
    {
      _request.Path.Returns(new PathString("/static"));
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeTrue();
      _challengeProperties.Should().BeNull();
    }

    [Test]
    public async Task AuthenticatedRequestsPassThrough()
    {
      _request.Path.Returns(new PathString("/home"));
      _identity.IsAuthenticated.Returns(true);
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeTrue();
      _challengeProperties.Should().BeNull();
    }

    [Test]
    public async Task NotAuthenticatedRequestsMustAuthenticate()
    {
      _request.PathBase.Returns(new PathString("/website"));
      _request.Path.Returns(new PathString("/home"));
      _request.QueryString.Returns(new QueryString("?question=answer"));
      _identity.IsAuthenticated.Returns(false);
      await StartupExtensions.AuthenticateSPAFilesInternal(_request, _user, _challenge, _next);
      _nextWasCalled.Should().BeFalse();
      _challengeProperties.Should().NotBeNull();
      _challengeProperties.RedirectUri.Should().Be("/website/home?question=answer");
    }
  }
}