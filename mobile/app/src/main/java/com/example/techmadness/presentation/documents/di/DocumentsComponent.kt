package com.example.techmadness.presentation.documents.di

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.documents.DocumentsDependencies
import com.example.techmadness.di.deps.login.LoginDependencies
import com.example.techmadness.di.deps.navigation.RouterDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Component

@PerPresentationScope
@Component(
    dependencies = [
        RouterDependencies::class,
        DocumentsDependencies::class,
        LoginDependencies::class
    ]
)
interface DocumentsComponent {

    fun inject(documentsGraph: DocumentsGraph)

    companion object : ComponentCompanion<DocumentsComponent>() {
        override fun createComponent(): DocumentsComponent {
            return DaggerDocumentsComponent.builder()
                .routerDependencies(RouterDependencies.get())
                .documentsDependencies(DocumentsDependencies.get())
                .loginDependencies(LoginDependencies.get())
                .build()
        }
    }
}