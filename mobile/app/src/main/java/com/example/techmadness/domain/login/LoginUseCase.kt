package com.example.techmadness.domain.login

import com.example.techmadness.model.User
import com.example.techmadness.model.UserResponse
import io.reactivex.Single

interface LoginUseCase {
    fun login(login: String, pw: String): Single<UserResponse>
    fun setUser(
        login: String,
        name: String,
        surname: String,
        patronymic: String,
        role: String,
        companyId: String
    )

    fun getUser(): User
}