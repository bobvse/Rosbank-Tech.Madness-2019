package com.example.techmadness.core.screen

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.techmadness.di.core.BaseGraph

abstract class BaseDIMoxyFragment<G : BaseGraph<*>> : MoxyFragment() {
    val graph by lazy { uninitializedGraph.apply { init() } }

    private val uninitializedGraph by lazy { createGraph() }

    abstract fun createGraph(): G

    abstract fun getLayoutRes(): Int

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(getLayoutRes(), container, false)
    }
}