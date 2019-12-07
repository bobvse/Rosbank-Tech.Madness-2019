package com.example.techmadness.domain.documents

import com.example.techmadness.model.CompanyResponse
import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface GetDocumentsUseCase {
    fun testResponse(): Single<Testresponse>
    fun getCompany(id: String): Single<CompanyResponse>
}