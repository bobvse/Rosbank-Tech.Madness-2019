package com.example.techmadness.presentation.documents

import com.arellomobile.mvp.MvpView
import com.example.techmadness.model.TestDocument

interface DocumentsView : MvpView{
    fun updateDocuments(documents: List<TestDocument>)
}