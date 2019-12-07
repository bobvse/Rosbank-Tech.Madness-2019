package com.example.techmadness.data.login

import com.example.techmadness.model.User
import com.example.techmadness.model.UserResponse
import io.reactivex.Single

interface LoginRepository {
    fun login(login: String): Single<UserResponse>

    fun setUser(
        login: String,
        name: String,
        surname: String,
        patronymic: String,
        role: String,
        companyId: String
    )

    fun getMainUser():User
 }