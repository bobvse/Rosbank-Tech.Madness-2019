package com.example.techmadness.presentation.main

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.presentation.main.di.MainGraph
import ru.terrakok.cicerone.Navigator
import ru.terrakok.cicerone.NavigatorHolder
import javax.inject.Inject

@InjectViewState
class MainPresenter
@Inject constructor(
    private val mainRouter: MainRouter,
    private val navigatorHolder: NavigatorHolder)
    : BasePresenter<MainView>(){

    fun init(){
        mainRouter.openLoginScreen()
    }

    fun setNavigator(navigator: Navigator) {
        navigatorHolder.setNavigator(navigator)
    }

    fun removeNavigator() {
        navigatorHolder.removeNavigator()
    }
}