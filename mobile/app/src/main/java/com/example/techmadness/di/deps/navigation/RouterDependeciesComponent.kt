package com.example.techmadness.di.deps.navigation

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.scope.ApplicationScope
import dagger.Component

@ApplicationScope
@Component(
    modules = [
        RouterModule::class
    ]
)
interface RouterDependenciesComponent : RouterDependencies {
    companion object : ComponentCompanion<RouterDependenciesComponent>() {
        override fun createComponent(): RouterDependenciesComponent {
            return DaggerRouterDependenciesComponent.builder()
                .build()
        }
    }
}