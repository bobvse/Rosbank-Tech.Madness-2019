package com.example.techmadness.data.login

import com.example.techmadness.model.Testresponse
import io.reactivex.Single

interface LoginRepository{
    fun login(): Single<Testresponse>
}