package com.example.techmadness

import android.app.Application
import com.example.techmadness.di.core.DependencyResolver

class App : Application(){

    override fun onCreate() {
        super.onCreate()

        //инит зависимостей
        DependencyResolver.initDependencies(this)
    }
}