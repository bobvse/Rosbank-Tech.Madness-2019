package com.example.techmadness.domain.login

import com.example.techmadness.data.login.LoginRepository
import javax.inject.Inject

class LoginInteractor@Inject constructor(val loginRepository: LoginRepository) : LoginUseCase {


}