package com.example.techmadness.di.core

import android.app.Application
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.deps.navigation.RouterDependenciesComponent

object DependencyResolver {
    fun initDependencies(application: Application) {
        RouterDependencies.initProvider { RouterDependenciesComponent.createComponent() }
    }
}