package com.example.techmadness.data.documents

import com.example.techmadness.model.CompanyResponse
import com.example.techmadness.model.DocumentsResponse
import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface DocumentsRepository {
    fun getCompany(id: String): Single<CompanyResponse>
    fun getDocuments(id: String): Single<DocumentsResponse>
}