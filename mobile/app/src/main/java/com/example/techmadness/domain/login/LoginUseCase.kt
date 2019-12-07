package com.example.techmadness.domain.login

import com.example.techmadness.model.UserResponse
import io.reactivex.Single

interface LoginUseCase {
    fun login(login: String, pw: String): Single<UserResponse>
}