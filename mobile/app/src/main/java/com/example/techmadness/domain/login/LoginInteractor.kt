package com.example.techmadness.domain.login

import com.example.techmadness.data.login.LoginRepository
import com.example.techmadness.model.UserResponse
import io.reactivex.Single
import javax.inject.Inject

class LoginInteractor @Inject constructor(private val loginRepository: LoginRepository) : LoginUseCase {

    override fun login(login: String, pw: String): Single<UserResponse> {
        return loginRepository.login(login)
    }


}