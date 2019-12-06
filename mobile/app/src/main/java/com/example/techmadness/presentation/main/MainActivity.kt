package com.example.techmadness.presentation.main

import android.os.Bundle
import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyActivity
import com.example.techmadness.presentation.main.di.MainGraph

class MainActivity : BaseDIMoxyActivity<MainGraph>(), MainView {

    @InjectPresenter
    lateinit var presenter: MainPresenter

    @ProvidePresenter
    fun provideLoginPresenter() = graph.mainPresenter

    override fun createGraph(): MainGraph = MainGraph()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
