
using System;
using System.Collections.Generic;
using System.Text;
using Autofac;
using SigningServer.Core.Commands;
using SigningServer.Core.Mappers;
using SigningServer.Core.Parsers;
using SigningServer.Domain;
using SigningServer.Settings;

namespace SigningServer.DI.Modules
{
    public class DataModule: Module
    {
        SigningServerSettings _settings;
        public DataModule(SigningServerSettings settings)
        {
            _settings = settings;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new SigningDocsRepository(_settings.ConnectionString));
            builder.Register(c => new DocumentParser()).SingleInstance();
            builder.Register(c => new DocumentMapper()).SingleInstance();
            builder.Register(c => new UploadDocumentsCommand(c.Resolve<SigningDocsRepository>(), 
                c.Resolve<DocumentParser>()));
            builder.Register(c => new GetDocumentsCommand(c.Resolve<SigningDocsRepository>(),
                c.Resolve<DocumentMapper>()));
            builder.Register(c => new UserInfoCommand(c.Resolve<SigningDocsRepository>()
                ));
            builder.Register(c => new SignDocumentsCommand(c.Resolve<SigningDocsRepository>()
            ));
            builder.Register(c => new UpdateDocumentsCommand(c.Resolve<SigningDocsRepository>()
            ));
            builder.Register(c => new CompanyInfoCommand(c.Resolve<SigningDocsRepository>()
            ));

        }
    }
}
