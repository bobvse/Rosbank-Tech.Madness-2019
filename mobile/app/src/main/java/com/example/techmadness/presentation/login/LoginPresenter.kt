package com.example.techmadness.presentation.login

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.core.extensions.async
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.domain.login.LoginUseCase
import javax.inject.Inject

@InjectViewState
class LoginPresenter @Inject constructor(
    private val mainRouter: MainRouter,
    private val loginUseCase: LoginUseCase
) : BasePresenter<LoginView>() {

    fun onLoginBtnClicked(login: String, pw: String) {
        val error = "Sorry, you are not a Director!"
        unsubscribeOnDestroy(loginUseCase.login(login, pw).async().subscribe({
            if (it.role == "Director") {
                mainRouter.openDocumentsScreen()
            } else {
                viewState.showToast(error)
            }

        }, {
        }))
        loginUseCase.login(login, pw)
    }
}