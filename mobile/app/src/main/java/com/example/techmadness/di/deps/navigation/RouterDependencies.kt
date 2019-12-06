package com.example.techmadness.di.deps.navigation

import com.example.techmadness.di.core.SingletonWithProvider
import com.example.techmadness.di.core.navigation.MainRouter
import ru.terrakok.cicerone.NavigatorHolder

interface RouterDependencies {
    fun provideMainRouter(): MainRouter
    fun provideNavigatorHolder(): NavigatorHolder

    companion object : SingletonWithProvider<RouterDependencies>()
}