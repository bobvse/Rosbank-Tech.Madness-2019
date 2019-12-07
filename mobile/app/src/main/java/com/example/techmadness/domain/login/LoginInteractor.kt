package com.example.techmadness.domain.login

import com.example.techmadness.data.login.LoginRepository
import com.example.techmadness.model.User
import com.example.techmadness.model.UserResponse
import io.reactivex.Single
import javax.inject.Inject

class LoginInteractor @Inject constructor(private val loginRepository: LoginRepository) : LoginUseCase {

    override fun login(login: String, pw: String): Single<UserResponse> {
        return loginRepository.login(login)
    }

    override fun setUser(
        login: String,
        name: String,
        surname: String,
        patronymic: String,
        role: String,
        companyId: String
    ) {
        loginRepository.setUser(login,name,surname,patronymic,role,companyId)
    }

    override fun getUser(): User {
        return loginRepository.getMainUser()
    }


}