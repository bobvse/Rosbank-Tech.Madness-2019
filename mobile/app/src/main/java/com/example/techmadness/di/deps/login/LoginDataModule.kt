package com.example.techmadness.di.deps.login

import com.example.techmadness.data.login.LoginRepository
import com.example.techmadness.data.login.LoginRepositoryImpl
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Binds
import dagger.Module

@Module
interface LoginDataModule {
    @Binds
    @PerPresentationScope
    fun provideLoginRepository(loginRepository: LoginRepositoryImpl): LoginRepository
}