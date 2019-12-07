using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Shared
{
    public interface IMapper<TIn, TOut>
    {
        TOut Map(TIn obj);
    }
}
