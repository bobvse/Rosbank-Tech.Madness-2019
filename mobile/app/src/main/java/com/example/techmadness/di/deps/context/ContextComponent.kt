package com.example.techmadness.di.deps.context

import android.content.Context
import com.example.techmadness.di.scope.ApplicationScope
import dagger.Component

@Component(modules = [ContextModule::class])
@ApplicationScope
interface ContextComponent : ContextDependencies {
    companion object {
        fun build(context: Context): ContextComponent {
            return DaggerContextComponent.builder()
                .contextModule(ContextModule(context))
                .build()
        }
    }
}