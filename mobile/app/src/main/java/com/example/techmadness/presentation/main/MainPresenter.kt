package com.example.techmadness.presentation.main

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.presentation.main.di.MainGraph
import javax.inject.Inject

@InjectViewState
class MainPresenter @Inject constructor(val mainRouter: MainRouter): BasePresenter<MainView>(){}