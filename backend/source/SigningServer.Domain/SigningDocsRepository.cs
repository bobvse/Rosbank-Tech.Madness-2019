using System;
using System.Collections.Generic;
using System.Data;
using SigningServer.Domain.Models;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Dapper.Contrib.Extensions;
using SigningServer.Shared;

namespace SigningServer.Domain
{
    public class SigningDocsRepository
    {
        private string _connectionString;

        public SigningDocsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<DocumentModel> GetDocumentsForSigning(Guid companyId)
        {
            using (var conn = GetConnection())
            {
                return conn.Query<DocumentModel>("SELECT * FROM Documents WHERE CompanyId = @CompanyId AND Status <> @Status",
                    new { CompanyId = companyId, Status = (int)DocumentStatus.Signed }).ToList();
            }
        }

        public List<DocumentModel> GetUserDocuments(Guid userId)
        {
            using (var conn = GetConnection())
            {
                return conn.Query<DocumentModel>("SELECT * FROM Documents WHERE CreatorId = @creatorId AND Status <> @Status",
                    new { CreatorId = userId, Status = (int)DocumentStatus.Signed }).ToList();
            }
        }

        public DocumentModel GetDocument(Guid documentId)
        {
            using (var conn = GetConnection())
            {
                return conn.QueryFirst<DocumentModel>("SELECT * FROM Documents WHERE Id = @Id AND Status <> @Status",
                    new { Id = documentId, Status = (int)DocumentStatus.Signed });
            }
        }

        public void AddDocuments(List<DocumentModel> documents)
        {
            using (var conn = GetConnection())
            {
                conn.Open();
                using (var tran = conn.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    foreach (var doc in documents)
                    {
                        conn.Insert(doc, transaction: tran);
                    }
                    tran.Commit();
                }
            }
        }

        public bool SignDocuments(List<Guid> documentIds)
        {
            using (var conn = GetConnection())
            {
                conn.Open();
                using (var tran = conn.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    foreach (var docId in documentIds)
                    {
                        var doc = conn.QueryFirst<DocumentModel>("SELECT * FROM Documents WHERE Id = @Id", new { Id = docId },  transaction:tran);
                        if (doc.StatusTyped == DocumentStatus.Signed)
                        {
                            throw new Exception($"Document with id {docId} already signed");
                        }

                        doc.StatusTyped = DocumentStatus.Signed;
                        doc.SignDate = DateTime.Now;
                        conn.Update(doc, tran);
                    }
                    tran.Commit();
                }
            }

            return true;
        }

        public CompanyModel GetCompany(Guid companyId)
        {
            using (var conn = GetConnection())
            {
                return conn.QueryFirst<CompanyModel>("SELECT TOP 1 * FROM Companies WHERE Id = @Id",
                    new { Id = companyId });
            }
        }

        public UserModel GetUser(string login)
        {
            using (var conn = GetConnection())
            {
                return conn.QueryFirst<UserModel>("SELECT TOP 1 * FROM Users WHERE Login = @Login",
                    new { Login = login });
            }
        }
        
        public bool UpdateDocument(DocumentModel document)
        {
            using (var conn = GetConnection())
            {
                conn.Update(document);
                return true;
            }
        }

        //public void Sign(List<>)
        //{

        //}

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
