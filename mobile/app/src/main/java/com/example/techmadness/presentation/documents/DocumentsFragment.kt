package com.example.techmadness.presentation.documents

import android.os.Bundle
import android.view.View
import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyFragment
import com.example.techmadness.presentation.documents.di.DocumentsGraph
import kotlinx.android.synthetic.main.documents_fragment.*

class DocumentsFragment : BaseDIMoxyFragment<DocumentsGraph>(), DocumentsView {

    companion object {
        fun newInstance(): DocumentsFragment {
            return DocumentsFragment()
        }
    }

    @InjectPresenter
    lateinit var presenter: DocumentsPresenter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        tvBalance.text = String.format(resources.getString(R.string.balance_text), 20)
    }

    @ProvidePresenter
    fun provideDocumentsPresenter() = graph.documentsPresenter

    override fun createGraph(): DocumentsGraph = DocumentsGraph()

    override fun getLayoutRes(): Int = R.layout.documents_fragment
}
