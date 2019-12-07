package com.example.techmadness.data.login

import com.example.techmadness.core.networking.TechMadnessApiService
import com.example.techmadness.model.User
import com.example.techmadness.model.UserResponse
import io.reactivex.Single
import javax.inject.Inject

class LoginRepositoryImpl @Inject constructor(private val techMadnessApiService: TechMadnessApiService) :
    LoginRepository {

    private val user by lazy { User() }


    override fun login(login: String): Single<UserResponse> {
        return techMadnessApiService.login(login)
    }

    //TODO хаккатон код, так не делать! И выносить в базу
    override fun setUser(
        login: String,
        name: String,
        surname: String,
        patronymic: String,
        role: String,
        companyId: String
    ) {
        user.login = login
        user.name = name
        user.surname = surname
        user.patronymic = patronymic
        user.role = role
        user.companyId = companyId
    }

    override fun getMainUser(): User {
        return user
    }

}