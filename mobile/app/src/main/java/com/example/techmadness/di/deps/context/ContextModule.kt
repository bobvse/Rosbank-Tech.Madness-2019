package com.example.techmadness.di.deps.context

import android.content.Context
import com.example.techmadness.di.scope.ApplicationScope
import dagger.Module
import dagger.Provides

@Module
class ContextModule(
    private val context: Context
) {
    @Provides
    @ApplicationScope
    fun provideContext(): Context {
        return context
    }
}