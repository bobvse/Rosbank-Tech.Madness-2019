package com.example.techmadness.presentation.documents.di

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import com.example.techmadness.presentation.login.di.DaggerLoginComponent
import com.example.techmadness.presentation.login.di.LoginGraph
import dagger.Component

@PerPresentationScope
@Component(
    dependencies = [
        RouterDependencies::class
    ]
)
interface DocumentsComponent {

    fun inject(documentsGraph: DocumentsGraph)

    companion object : ComponentCompanion<DocumentsComponent>() {
        override fun createComponent(): DocumentsComponent {
            return DaggerDocumentsComponent.builder()
                .routerDependencies(RouterDependencies.get())
                .build()
        }
    }
}