package com.example.techmadness.presentation.documents.di

import com.example.techmadness.di.core.BaseGraph
import com.example.techmadness.presentation.documents.DocumentsPresenter
import com.example.techmadness.presentation.login.LoginPresenter
import com.example.techmadness.presentation.login.di.LoginComponent
import javax.inject.Inject

class DocumentsGraph : BaseGraph<DocumentsComponent>(DocumentsComponent.Companion) {

    @Inject
    lateinit var documentsPresenter: DocumentsPresenter

    override fun inject(component: DocumentsComponent) {
        component.inject(this)
    }
}