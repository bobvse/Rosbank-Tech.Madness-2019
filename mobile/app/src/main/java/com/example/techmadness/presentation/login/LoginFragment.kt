package com.example.techmadness.presentation.login

import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.core.screen.BaseDIMoxyFragment
import com.example.techmadness.presentation.login.di.LoginGraph

class LoginFragment : BaseDIMoxyFragment<LoginGraph>(), LoginView{

    companion object {
        fun newInstance(): LoginFragment {
            return LoginFragment()
        }
    }

    @InjectPresenter
    lateinit var presenter: LoginPresenter

    @ProvidePresenter
    fun provideLoginPresenter() = graph.loginPresenter

    override fun createGraph(): LoginGraph = LoginGraph()

    override fun getLayoutRes(): Int {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}