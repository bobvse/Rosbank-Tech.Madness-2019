package com.example.techmadness.core.networking

import com.example.techmadness.core.networking.Annotations.Json
import com.example.techmadness.model.Testresponse
import io.reactivex.Single
import retrofit2.http.GET
import retrofit2.http.QueryMap

interface TechMadnessApiService{

    @GET("Test/Get")
    @Json
    fun test(): Single<Testresponse>
}