using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;
using SigningServer.Shared;

namespace SigningServer.Core.Parsers
{
    public class DocumentParser
    {
        private XmlSerializer _serializer;
        public DocumentParser()
        {
            _serializer = new XmlSerializer(typeof(Document1C));
        }

        public Document1C Parse(byte[] documentBody)
        {
            using (var reader = new MemoryStream(documentBody))
            {
                return (Document1C)_serializer.Deserialize(reader);
            }
        }
    }
}
