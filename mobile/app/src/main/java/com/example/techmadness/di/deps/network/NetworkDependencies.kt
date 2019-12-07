package com.example.techmadness.di.deps.network

import com.example.techmadness.core.networking.DocumentsApiService
import com.example.techmadness.di.core.SingletonWithProvider

interface NetworkDependencies{
    fun provideApi(): DocumentsApiService

    companion object : SingletonWithProvider<NetworkDependencies>()
}