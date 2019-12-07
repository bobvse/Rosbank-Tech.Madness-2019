using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Domain.Models;
using SigningServer.Shared;

namespace SigningServer.Domain.Extensions
{
    public static class UserExtensions
    {
        public static bool IsOperator(this UserModel user)
        {
            return user.RoleTyped == UserRole.Operator;
        }

        public static bool IsDirector(this UserModel user)
        {
            return user.RoleTyped == UserRole.Director;
        }
    }
}
