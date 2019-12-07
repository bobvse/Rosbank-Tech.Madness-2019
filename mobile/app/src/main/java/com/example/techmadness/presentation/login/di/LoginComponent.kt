package com.example.techmadness.presentation.login.di

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.login.LoginDependencies
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Component

@PerPresentationScope
@Component(
    dependencies = [
        RouterDependencies::class,
        LoginDependencies::class
    ]
)
interface LoginComponent {

    fun inject(loginGraph: LoginGraph)

    companion object : ComponentCompanion<LoginComponent>() {
        override fun createComponent(): LoginComponent {
            return DaggerLoginComponent.builder()
                .routerDependencies(RouterDependencies.get())
                .loginDependencies(LoginDependencies.get())
                .build()
        }
    }
}