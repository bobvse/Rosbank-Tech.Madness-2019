package com.example.techmadness.presentation.login.di

import com.example.techmadness.di.core.BaseGraph
import com.example.techmadness.presentation.login.LoginPresenter
import javax.inject.Inject

class LoginGraph : BaseGraph<LoginComponent>(LoginComponent.Companion) {

    @Inject
    lateinit var loginPresenter: LoginPresenter

    override fun inject(component: LoginComponent) {
        component.inject(this)
    }
}