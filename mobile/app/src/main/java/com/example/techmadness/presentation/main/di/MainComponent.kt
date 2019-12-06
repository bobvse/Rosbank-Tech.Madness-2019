package com.example.techmadness.presentation.main.di

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import com.example.techmadness.presentation.login.di.LoginComponent
import com.example.techmadness.presentation.login.di.LoginGraph
import dagger.Component

@PerPresentationScope
@Component(
    dependencies = [
       RouterDependencies::class
    ]
)
interface MainComponent {

    fun inject(mainGraph: MainGraph)

    companion object : ComponentCompanion<MainComponent>() {
        override fun createComponent(): MainComponent {
            return DaggerMainComponent.builder()
                .routerDependencies(RouterDependencies.get())
                .build()
        }
    }
}