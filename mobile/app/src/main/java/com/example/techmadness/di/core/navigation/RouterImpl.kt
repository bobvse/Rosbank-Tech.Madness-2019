package com.example.techmadness.di.core.navigation

import ru.terrakok.cicerone.Router

class RouterImpl : Router(), MainRouter {

    override fun openLoginScreen() {
        newRootScreen(Screens.LoginScreen)
    }

    override fun openDocumentsScreen() {
        navigateTo(Screens.DocumentsScreen)
    }

    override fun goBack() = exit()
}