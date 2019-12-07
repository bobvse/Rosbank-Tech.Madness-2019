package com.example.techmadness.di.deps.login

import com.example.techmadness.di.scope.PerPresentationScope
import com.example.techmadness.domain.documents.DocumentsInteractor
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import com.example.techmadness.domain.login.LoginInteractor
import com.example.techmadness.domain.login.LoginUseCase
import dagger.Binds
import dagger.Module

@Module
interface LoginDomainModule {
    @Binds
    @PerPresentationScope
    fun provideLoginUseCase(loginInteractor: LoginInteractor): LoginUseCase
}