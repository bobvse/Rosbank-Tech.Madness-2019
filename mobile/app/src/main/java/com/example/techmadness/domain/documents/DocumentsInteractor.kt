package com.example.techmadness.domain.documents

import com.example.techmadness.data.documents.DocumentsRepository
import com.example.techmadness.model.CompanyResponse
import com.example.techmadness.model.Testresponse
import io.reactivex.Single
import javax.inject.Inject

class DocumentsInteractor @Inject constructor(
    private val repository: DocumentsRepository
) : GetDocumentsUseCase {

    override fun testResponse(): Single<Testresponse> {
        return repository.test()
    }

    override fun getCompany(id: String): Single<CompanyResponse> {
        return repository.getCompany(id)
    }

}