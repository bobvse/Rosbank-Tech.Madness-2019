package com.example.techmadness.di.deps.network

import com.example.techmadness.core.networking.TechMadnessApiService
import com.example.techmadness.core.networking.JsonAndXmlConverters
import com.example.techmadness.di.scope.ApplicationScope
import com.google.gson.FieldNamingPolicy
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import dagger.Module
import dagger.Provides
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.simplexml.SimpleXmlConverterFactory
import java.lang.reflect.Modifier

@Module
class RetrofitModule {

    companion object {
        private const val BASE_URL = "http://hakaton-nirvana.eastus.cloudapp.azure.com:8080"
        private const val DATE_FORMAT = "yyyy-MM-dd HH:mm:ss"
    }

    @Provides
    @ApplicationScope
    fun provideAviaApi(retrofit: Retrofit): TechMadnessApiService {
        return retrofit.create(TechMadnessApiService::class.java)
    }

    @Provides
    @ApplicationScope
    fun provideRetrofit(gson: Gson, httpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(
                JsonAndXmlConverters.QualifiedTypeConverterFactory(
                GsonConverterFactory.create(gson),
                SimpleXmlConverterFactory.create()))
            .client(httpClient)
            .baseUrl(BASE_URL)
            .build()
    }

    @Provides
    @ApplicationScope
    fun provideGson(): Gson {
        return GsonBuilder()
            .setLenient()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .excludeFieldsWithModifiers(Modifier.FINAL, Modifier.TRANSIENT, Modifier.STATIC)
            .setDateFormat(DATE_FORMAT)
            .setPrettyPrinting()
            .create()
    }

    @Provides
    @ApplicationScope
    fun provideHttpClient(
        httpLoggingInterceptor: HttpLoggingInterceptor
    ): OkHttpClient {
        val client = OkHttpClient.Builder()
            .addInterceptor(httpLoggingInterceptor)
            .hostnameVerifier { _, _ -> true }
        return client.build()
    }

    @Provides
    @ApplicationScope
    fun provideLoggingInterceptor(): HttpLoggingInterceptor {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY
        return loggingInterceptor
    }
}