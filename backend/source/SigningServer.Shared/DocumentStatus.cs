﻿using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Shared
{
    
    public enum DocumentStatus
    {
        New,
        Checked,
        CheckedHighPriority,
        Signed
    }
}
