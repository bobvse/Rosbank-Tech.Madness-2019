package com.example.techmadness.presentation.login

import android.os.Bundle
import android.view.View
import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyFragment
import com.example.techmadness.presentation.login.di.LoginGraph
import kotlinx.android.synthetic.main.login_fragment.*


class LoginFragment : BaseDIMoxyFragment<LoginGraph>(), LoginView {

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

    override fun getLayoutRes(): Int = R.layout.login_fragment

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initViews()

    }

    private fun initViews(){
        btnLogin.setOnClickListener {
            presenter.onLoginBtnClicked()
        }
    }


}