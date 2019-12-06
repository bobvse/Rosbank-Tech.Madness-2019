package com.example.techmadness.presentation.main

import android.os.Bundle
import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyActivity
import com.example.techmadness.presentation.main.di.MainGraph
import ru.terrakok.cicerone.android.support.SupportAppNavigator

class MainActivity : BaseDIMoxyActivity<MainGraph>(), MainView {

    @InjectPresenter
    lateinit var presenter: MainPresenter

    @ProvidePresenter
    fun provideLoginPresenter():MainPresenter{
        graph.mainPresenter.init()
        return graph.mainPresenter
    }

    override fun createGraph(): MainGraph = MainGraph()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
    }

    private val navigator: SupportAppNavigator by lazy {
        SupportAppNavigator(this, supportFragmentManager, R.id.screen_container)
    }

    override fun onResumeFragments() {
        presenter.setNavigator(navigator)
        super.onResumeFragments()
    }

    override fun onPause() {
        presenter.removeNavigator()
        super.onPause()
    }
}
