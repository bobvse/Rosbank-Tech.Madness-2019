package com.example.techmadness.presentation.documents

import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyFragment
import com.example.techmadness.presentation.documents.di.DocumentsGraph

class DocumentsFragment : BaseDIMoxyFragment<DocumentsGraph>(), DocumentsView {

    companion object {
        fun newInstance(): DocumentsFragment {
            return DocumentsFragment()
        }
    }

    @InjectPresenter
    lateinit var presenter: DocumentsPresenter

    @ProvidePresenter
    fun provideDocumentsPresenter() = graph.documentsPresenter

    override fun createGraph(): DocumentsGraph = DocumentsGraph()

    override fun getLayoutRes(): Int = R.layout.documents_fragment
}
