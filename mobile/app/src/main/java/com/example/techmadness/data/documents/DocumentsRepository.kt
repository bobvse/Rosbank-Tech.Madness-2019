package com.example.techmadness.data.documents

import com.example.techmadness.model.CompanyResponse
import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface DocumentsRepository {
    fun test(): Single<Testresponse>
    fun getCompany(id:String): Single<CompanyResponse>
}