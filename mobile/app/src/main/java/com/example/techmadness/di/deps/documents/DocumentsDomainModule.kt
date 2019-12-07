package com.example.techmadness.di.deps.documents

import com.example.techmadness.di.scope.PerPresentationScope
import com.example.techmadness.domain.documents.DocumentsInteractor
import com.example.techmadness.domain.documents.GetDocumentsUseCase
import dagger.Binds
import dagger.Module

@Module
interface DocumentsDomainModule {
    @Binds
    @PerPresentationScope
    fun provideGetDocumentsUseCase(documentsInteractor: DocumentsInteractor): GetDocumentsUseCase
}