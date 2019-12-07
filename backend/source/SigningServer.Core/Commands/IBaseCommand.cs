using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Commands
{
    public interface IBaseCommand<TRequest, TResponse>
    {
        TResponse Execute(TRequest request);
    }
}
