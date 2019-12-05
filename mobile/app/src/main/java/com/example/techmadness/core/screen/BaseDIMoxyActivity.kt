package com.example.techmadness.core.screen

import com.example.techmadness.di.core.BaseGraph

abstract class BaseDIMoxyActivity<G : BaseGraph<*>> : MoxyActivity() {

    val graph by lazy { uninitializedGraph.apply { init() } }

    private val uninitializedGraph by lazy { createGraph() }

    abstract fun createGraph(): G
}