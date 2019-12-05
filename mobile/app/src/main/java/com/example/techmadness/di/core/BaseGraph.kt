package com.example.techmadness.di.core

/**
 * Предоставляет зависимости конкретному экрану
 */
abstract class BaseGraph<C : Any>(
    private val companion: ComponentCompanion<C>
) {

    fun init() {
        inject(companion.get())
    }

    abstract fun inject(component: C)

    fun onFeatureFinish() {
        companion.onFeatureFinish()
    }
}