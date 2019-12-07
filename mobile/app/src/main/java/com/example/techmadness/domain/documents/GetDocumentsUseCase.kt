package com.example.techmadness.domain.documents

import com.example.techmadness.model.CompanyResponse
import com.example.techmadness.model.DocumentsResponse
import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface GetDocumentsUseCase {
    fun getCompany(id: String): Single<CompanyResponse>
    fun getDocuments(id:String):Single<DocumentsResponse>
}