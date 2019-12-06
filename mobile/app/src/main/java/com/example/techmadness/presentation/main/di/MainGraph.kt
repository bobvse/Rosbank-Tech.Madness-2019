package com.example.techmadness.presentation.main.di

import com.example.techmadness.di.core.BaseGraph
import com.example.techmadness.presentation.main.MainPresenter
import javax.inject.Inject

class MainGraph : BaseGraph<MainComponent>(MainComponent.Companion) {

    @Inject
    lateinit var mainPresenter: MainPresenter

    override fun inject(component: MainComponent) {
        component.inject(this)
    }
}