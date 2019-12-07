package com.example.techmadness.presentation.documents

import android.util.Log
import com.arellomobile.mvp.InjectViewState
import com.example.techmadness.core.BasePresenter
import com.example.techmadness.core.extensions.async
import com.example.techmadness.di.core.navigation.MainRouter
import com.example.techmadness.domain.documents.DocumentsInteractor
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import com.example.techmadness.domain.login.LoginUseCase
import com.example.techmadness.model.DocumentsResponse
import com.example.techmadness.model.TestDocument
import com.example.techmadness.model.User
import com.example.techmadness.presentation.login.LoginView
import javax.inject.Inject

@InjectViewState
class DocumentsPresenter @Inject constructor(
    val mainRouter: MainRouter,
    private val documentsUseCase: GetDocumentsUseCase,
    private val loginUseCase: LoginUseCase,
    private val documentsInteractor: DocumentsInteractor //для ускорения работы, в дальнейшем попилить на юз-кейсы
) : BasePresenter<DocumentsView>() {

    lateinit var user: User

    override fun onFirstViewAttach() {
        super.onFirstViewAttach()
        user = loginUseCase.getUser()

     //   unsubscribeOnDestroy(documentsInteractor.getTest(user.login).async().subscribe({},{}))

        unsubscribeOnDestroy(documentsUseCase.getDocuments(user.login).async().subscribe({
            Log.d("1",it.toString())
        },{
            Log.d("1",it.toString())
        }
        ))



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