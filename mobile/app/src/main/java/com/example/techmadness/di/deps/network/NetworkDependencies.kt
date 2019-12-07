package com.example.techmadness.di.deps.network

import com.example.techmadness.core.networking.TechMadnessApiService
import com.example.techmadness.di.core.SingletonWithProvider

interface NetworkDependencies{
    fun provideApi(): TechMadnessApiService

    companion object : SingletonWithProvider<NetworkDependencies>()
}