package com.example.techmadness.di.deps.context

import android.content.Context
import com.example.techmadness.di.core.SingletonWithProvider

interface ContextDependencies {
    fun provideContext(): Context

    companion object : SingletonWithProvider<ContextDependencies>()
}