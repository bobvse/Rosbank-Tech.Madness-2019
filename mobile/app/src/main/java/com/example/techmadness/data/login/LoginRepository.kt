package com.example.techmadness.data.login

import com.example.techmadness.model.UserResponse
import io.reactivex.Single

interface LoginRepository{
    fun login(login: String): Single<UserResponse>
}