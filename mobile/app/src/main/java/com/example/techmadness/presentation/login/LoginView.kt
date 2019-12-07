package com.example.techmadness.presentation.login

import com.arellomobile.mvp.MvpView

interface LoginView : MvpView{
    fun showToast(error:String?)
}