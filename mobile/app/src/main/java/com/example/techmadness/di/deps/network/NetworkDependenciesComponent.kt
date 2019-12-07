package com.example.techmadness.di.deps.network

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.context.ContextDependencies
import com.example.techmadness.di.scope.ApplicationScope
import dagger.Component

@ApplicationScope
@Component(
    modules = [
        RetrofitModule::class
    ],
    dependencies = [
        ContextDependencies::class
    ]
)
interface NetworkDependenciesComponent : NetworkDependencies {
    companion object : ComponentCompanion<NetworkDependenciesComponent>() {
        override fun createComponent(): NetworkDependenciesComponent {
            return DaggerNetworkDependenciesComponent.builder()
                .contextDependencies(ContextDependencies.get())
                .build()
        }
    }
}