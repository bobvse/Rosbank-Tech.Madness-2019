package com.example.techmadness.presentation.documents

import android.graphics.drawable.ClipDrawable
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.arellomobile.mvp.presenter.InjectPresenter
import com.arellomobile.mvp.presenter.ProvidePresenter
import com.example.techmadness.R
import com.example.techmadness.core.screen.BaseDIMoxyFragment
import com.example.techmadness.model.TestDocument
import com.example.techmadness.presentation.documents.adapter.DocumentsAdapter
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
        initRecyclerView()
    }

    @ProvidePresenter
    fun provideDocumentsPresenter() = graph.documentsPresenter

    override fun createGraph(): DocumentsGraph = DocumentsGraph()

    override fun getLayoutRes(): Int = R.layout.documents_fragment

    private val adapter: DocumentsAdapter by lazy {
        DocumentsAdapter(
            onConfimBtnClick = presenter::onConfirmDocumentClick,
            onSelectItemClick = presenter::onCheckDocument
        )
    }

    private fun initRecyclerView() {
        rvDocuments.layoutManager = LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false)
        rvDocuments.addItemDecoration(DividerItemDecoration(activity, ClipDrawable.HORIZONTAL))
        rvDocuments.adapter = adapter
    }

    override fun updateDocuments(selectableData: List<TestDocument>) {
        adapter.updateItems(selectableData)
    }
}
