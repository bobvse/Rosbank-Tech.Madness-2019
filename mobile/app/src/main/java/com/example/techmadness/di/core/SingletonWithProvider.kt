package com.example.techmadness.di.core

abstract class SingletonWithProvider<S> {

    @Volatile
    private var reference: S? = null
    private var provider: (() -> S)? = null

    fun initProvider(provider: () -> S) {
        this.provider = provider
    }

    fun get(): S {
        val valReference = reference
        if (valReference == null) {
            synchronized(this) {
                val valReferenceSync = reference
                return if (valReferenceSync == null) {
                    provide().also { reference = it }
                } else {
                    valReferenceSync
                }
            }
        } else {
            return valReference
        }
    }

    private fun provide(): S {
        val provided = provider?.invoke()
        if (provided == null) {
            throw IllegalStateException("SingletonWithProvider should be initialized")
        } else {
            return provided
        }
    }
}