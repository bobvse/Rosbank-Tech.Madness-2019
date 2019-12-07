package com.example.techmadness.di.deps.login

import com.example.techmadness.di.core.SingletonWithProvider
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import com.example.techmadness.domain.login.LoginInteractor
import com.example.techmadness.domain.login.LoginUseCase

interface LoginDependencies {
   // fun provideLoginInteractor(): LoginInteractor
    fun provideLofinUseCase(): LoginUseCase

    companion object : SingletonWithProvider<LoginDependencies>()
}