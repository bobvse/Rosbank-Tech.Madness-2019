package com.example.techmadness.core.networking

import com.example.techmadness.core.networking.Annotations.Json
import com.example.techmadness.model.Testresponse
import com.example.techmadness.model.UserResponse
import io.reactivex.Single
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.QueryMap

interface TechMadnessApiService {

    @GET("Test/Get")
    @Json
    fun test(): Single<Testresponse>

    @GET("User/{id}")
    @Json
    fun login(@Path("id") id: String): Single<UserResponse>
}