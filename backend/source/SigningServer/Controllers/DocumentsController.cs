using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SigningServer.Core.Commands;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;

namespace SigningServer.Api.Controllers
{
    [Produces("application/json")]
    [Route("[Controller]")]
    public class DocumentsController: Controller
    {
        private readonly UploadDocumentsCommand _uploadDocumentsDocumentsCommand;
        private GetDocumentsCommand _getDocumentsCommand;
        private UpdateDocumentsCommand _updateDocumentsCommand;


        public DocumentsController(UploadDocumentsCommand uploadDocumentsDocumentsCommand,
         GetDocumentsCommand getDocumentsCommand,
         UpdateDocumentsCommand updateDocumentsCommand)
        {
            _uploadDocumentsDocumentsCommand = uploadDocumentsDocumentsCommand;
            _getDocumentsCommand = getDocumentsCommand;
            _updateDocumentsCommand = updateDocumentsCommand;
        }

        [HttpPost]
        [Route("{user}")]
        public async Task<BaseResponse> PostAsync( [FromRoute]string user, List<IFormFile> files)
        {
            var binaryDocuments = files.Select(i => GetDocumentBody(i)).ToList();
            var uploadRequest = new UploadRequest()
            {
                Files = binaryDocuments,
                UserLogin = user
            };
            var result = _uploadDocumentsDocumentsCommand.Execute(uploadRequest);
            return result;

        }

        [HttpGet]
        [Route("{user}")]
        [Produces("application/json")]
        public async Task<BaseResponse> GetAsync([FromRoute]string user)
        {
            var getRequest = new GetDocumentsRequest()
            {
                UserLogin = user
            };
            var result = _getDocumentsCommand.Execute(getRequest);
            return result;

        }

        [HttpPut]
        [Route("{user}")]
        [Produces("application/json")]
        public async Task<BaseResponse> PutAsync([FromRoute]string user, [FromBody]UpdateDocumentsRequest request)
        {
            request.UserLogin = user;
            var result = _updateDocumentsCommand.Execute(request);
            return result;

        }

        private byte[] GetDocumentBody(IFormFile file)
        {
            using(var resultStream = new MemoryStream())
            using (var readStream = file.OpenReadStream())
            {
                readStream.CopyTo(resultStream);
                return resultStream.ToArray();
            }
        }
    }
}
