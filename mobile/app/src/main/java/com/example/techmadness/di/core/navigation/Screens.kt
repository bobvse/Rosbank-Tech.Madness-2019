package com.example.techmadness.di.core.navigation

import com.example.techmadness.presentation.documents.DocumentsFragment
import com.example.techmadness.presentation.login.LoginFragment
import ru.terrakok.cicerone.android.support.SupportAppScreen

object Screens {

    object LoginScreen : SupportAppScreen() {
        override fun getFragment() = LoginFragment.newInstance()
    }

    object DocumentsScreen : SupportAppScreen() {
        override fun getFragment() = DocumentsFragment.newInstance()
    }
}