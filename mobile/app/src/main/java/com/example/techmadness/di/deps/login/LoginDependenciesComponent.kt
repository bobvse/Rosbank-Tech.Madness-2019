package com.example.techmadness.di.deps.login

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.network.NetworkDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Component

@PerPresentationScope
@Component(
    modules = [
        LoginDataModule::class,
        LoginDomainModule::class
    ], dependencies = [
        NetworkDependencies::class]
)
interface LoginDependenciesComponent : LoginDependencies {

    companion object : ComponentCompanion<LoginDependenciesComponent>() {
        override fun createComponent(): LoginDependenciesComponent {
            return DaggerLoginDependenciesComponent.builder()
                .networkDependencies(NetworkDependencies.get())
                .build()
        }
    }
}