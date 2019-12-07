package com.example.techmadness.di.deps.documents

import com.example.techmadness.di.core.ComponentCompanion
import com.example.techmadness.di.deps.network.NetworkDependencies
import com.example.techmadness.di.scope.PerPresentationScope
import dagger.Component


@PerPresentationScope
@Component(
    modules = [
        DocumentsDataModule::class,
        DocumentsDomainModule::class
    ], dependencies = [
        NetworkDependencies::class]
)
interface DocumentsDependenciesComponent : DocumentsDependencies {

    companion object : ComponentCompanion<DocumentsDependenciesComponent>() {
        override fun createComponent(): DocumentsDependenciesComponent {
            return DaggerDocumentsDependenciesComponent.builder()
                .networkDependencies(NetworkDependencies.get())
                .build()
        }
    }
}