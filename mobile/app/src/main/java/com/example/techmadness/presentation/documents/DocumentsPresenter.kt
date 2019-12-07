package com.example.techmadness.presentation.documents

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.core.extensions.async
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import com.example.techmadness.model.TestDocument
import com.example.techmadness.presentation.login.LoginView
import javax.inject.Inject

@InjectViewState
class DocumentsPresenter @Inject constructor(
    val mainRouter: MainRouter,
    private val documentsUseCase: GetDocumentsUseCase
) : BasePresenter<DocumentsView>() {

    override fun onFirstViewAttach() {
        super.onFirstViewAttach()
        val docs = listOf(TestDocument(),TestDocument())
        viewState.updateDocuments(docs)
        // unsubscribeOnDestroy(documentsUseCase.testResponse().async().subscribe({},{}))
    }

    fun onConfirmDocumentClick(testDocument: TestDocument){

    }

    fun onCheckDocument(testDocument: TestDocument){

    }
}