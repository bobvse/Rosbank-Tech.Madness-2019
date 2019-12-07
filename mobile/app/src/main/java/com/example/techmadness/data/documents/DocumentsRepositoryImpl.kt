package com.example.techmadness.data.documents

import com.example.techmadness.core.networking.TechMadnessApiService
import com.example.techmadness.model.Testresponse
import io.reactivex.Single
import javax.inject.Inject

class DocumentsRepositoryImpl @Inject constructor(private val techMadnessApiService: TechMadnessApiService) : DocumentsRepository {

    override fun test(): Single<Testresponse> {
      return techMadnessApiService.test()
    }
}