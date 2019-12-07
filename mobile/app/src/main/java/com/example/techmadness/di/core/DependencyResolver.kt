package com.example.techmadness.di.core

import android.app.Application
import com.example.techmadness.di.deps.context.ContextComponent
import com.example.techmadness.di.deps.context.ContextDependencies
import com.example.techmadness.di.deps.documents.DocumentsDependencies
import com.example.techmadness.di.deps.documents.DocumentsDependenciesComponent
import com.example.techmadness.di.deps.login.LoginDependencies
import com.example.techmadness.di.deps.login.LoginDependenciesComponent
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.deps.navigation.RouterDependenciesComponent
import com.example.techmadness.di.deps.network.NetworkDependencies
import com.example.techmadness.di.deps.network.NetworkDependenciesComponent

object DependencyResolver {
    fun initDependencies(application: Application) {
        ContextDependencies.initProvider { ContextComponent.build(application.applicationContext) }
        RouterDependencies.initProvider { RouterDependenciesComponent.createComponent() }
        LoginDependencies.initProvider { LoginDependenciesComponent.createComponent() }
        DocumentsDependencies.initProvider { DocumentsDependenciesComponent.createComponent() }
        NetworkDependencies.initProvider { NetworkDependenciesComponent.createComponent() }
    }
}