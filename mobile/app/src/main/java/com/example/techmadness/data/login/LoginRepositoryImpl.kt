package com.example.techmadness.data.login

import com.example.techmadness.core.networking.TechMadnessApiService
import com.example.techmadness.model.Testresponse
import io.reactivex.Single
import javax.inject.Inject

class LoginRepositoryImpl @Inject constructor(private val techMadnessApiService: TechMadnessApiService) :
    LoginRepository {

    override fun login(): Single<Testresponse> {
        return techMadnessApiService.test()
    }
}