package com.example.techmadness.presentation.login

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.di.core.navigation.MainRouter
import javax.inject.Inject

@InjectViewState
class LoginPresenter @Inject constructor(private val mainRouter: MainRouter

) : BasePresenter<LoginView>(){

    fun onLoginBtnClicked(){
        mainRouter.openDocumentsScreen()
    }
}