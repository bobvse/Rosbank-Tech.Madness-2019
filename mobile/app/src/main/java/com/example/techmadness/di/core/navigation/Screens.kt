package com.example.techmadness.di.core.navigation

import com.example.techmadness.presentation.login.LoginFragment
import ru.terrakok.cicerone.android.support.SupportAppScreen

object Screens {

    object LoginScreen : SupportAppScreen() {
        override fun getFragment() = LoginFragment.newInstance()
    }

//
//    data class FilterAirportsScreen(
//        private val initParams: FilterAirportsInitParams
//    ) : SupportAppScreen() {
//        override fun getFragment() = FilterAirportsAirportFragment.newInstance(initParams)
//    }
}