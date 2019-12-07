package com.example.techmadness.di.deps.documents

import com.example.techmadness.data.documents.DocumentsRepository
import com.example.techmadness.data.documents.DocumentsRepositoryImpl
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Binds
import dagger.Module

@Module
interface DocumentsDataModule {
    @Binds
    @PerPresentationScope
    fun provideDocumentsRepository(docmentsRepositoryImpl: DocumentsRepositoryImpl): DocumentsRepository
}