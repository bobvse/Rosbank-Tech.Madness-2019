package com.example.techmadness.presentation.documents

import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.core.extensions.async
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import com.example.techmadness.domain.login.LoginUseCase
import com.example.techmadness.model.TestDocument
import com.example.techmadness.model.User
import com.example.techmadness.presentation.login.LoginView
import javax.inject.Inject

@InjectViewState
class DocumentsPresenter @Inject constructor(
    val mainRouter: MainRouter,
    private val documentsUseCase: GetDocumentsUseCase,
    private val loginUseCase: LoginUseCase
) : BasePresenter<DocumentsView>() {

    lateinit var user: User

    override fun onFirstViewAttach() {
        super.onFirstViewAttach()
        user = loginUseCase.getUser()

        updateBalance()
        updateList()
    }

    private fun updateBalance() {
        unsubscribeOnDestroy(documentsUseCase.getCompany(user.companyId).async().subscribe(
            {
                //todo баланс и название
            }, {
                //todo ошибка
            }
        ))
    }

    fun updateList() {
        val docs = listOf(TestDocument(), TestDocument())
        viewState.updateDocuments(docs)
    }

    fun onConfirmDocumentClick(testDocument: TestDocument) {

    }

    fun onCheckDocument(testDocument: TestDocument) {

    }
}