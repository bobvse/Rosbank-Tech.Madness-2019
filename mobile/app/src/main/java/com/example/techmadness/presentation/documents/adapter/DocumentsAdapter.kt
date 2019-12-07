package com.example.techmadness.presentation.documents.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.example.techmadness.R
import com.example.techmadness.core.BaseItemsAdapter
import com.example.techmadness.model.TestDocument
import kotlinx.android.synthetic.main.document_item.*

class DocumentsAdapter(
    documents: MutableList<TestDocument> = mutableListOf(),
    private val onSelectItemClick: (item: TestDocument) -> Unit,
    private val onConfimBtnClick: (item: TestDocument) -> Unit
) : BaseItemsAdapter<TestDocument, DocumentsAdapter.DocumentsViewHolder>(documents) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DocumentsViewHolder {
        return DocumentsViewHolder(
            LayoutInflater.from(parent.context).inflate(
                R.layout.document_item,
                parent,
                false
            )
        )
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: DocumentsViewHolder, position: Int) {
        val bindCompany = items[position]
        holder.bind(bindCompany, onSelectItemClick, onConfimBtnClick)
    }

    class DocumentsViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val btnConfirm: Button = itemView.findViewById(R.id.btnConfirm)
        private val container:LinearLayout = itemView.findViewById(R.id.itemContainer)
        fun bind(
            document: TestDocument,
            onSelectItemClick: (item: TestDocument) -> Unit,
            onConfimBtnClick: (item: TestDocument) -> Unit
        ) {

            btnConfirm.setOnClickListener {
                container.background = itemView.context.resources.getDrawable(R.color.green)
                onConfimBtnClick(document) }
//
        }
    }

    override fun getDiffCallback(
        oldItems: List<TestDocument>,
        newItems: List<TestDocument>
    ): DiffUtil.Callback {
        return object : DiffUtil.Callback() {
            override fun getOldListSize() = oldItems.size

            override fun getNewListSize() = newItems.size

            override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
                return true
                // return oldItems[oldItemPosition].codeNameData.code() == newItems[newItemPosition].codeNameData.code()
            }

            override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
                return true
                //  return oldItems[oldItemPosition].isSelected == newItems[newItemPosition].isSelected
            }
        }
    }
}