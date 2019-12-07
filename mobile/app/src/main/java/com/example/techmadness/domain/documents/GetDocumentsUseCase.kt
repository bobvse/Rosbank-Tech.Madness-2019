package com.example.techmadness.domain.documents

import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface GetDocumentsUseCase{
    fun testResponse(): Single<Testresponse>
}