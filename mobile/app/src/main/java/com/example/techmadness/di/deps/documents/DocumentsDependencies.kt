package com.example.techmadness.di.deps.documents

import com.example.techmadness.di.core.SingletonWithProvider
import com.example.techmadness.domain.documents.DocumentsInteractor
import com.example.techmadness.domain.documents.GetDocumentsUseCase

interface DocumentsDependencies {
   // fun provideDocumentsInteractor(): DocumentsInteractor

    fun provideDocumentsUseCase(): GetDocumentsUseCase

    companion object : SingletonWithProvider<DocumentsDependencies>()
}