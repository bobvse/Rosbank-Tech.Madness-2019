package com.example.techmadness.core.extensions

import io.reactivex.*
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

fun <T> Observable<T>.async(): Observable<T> = subscribeOn(Schedulers.io()).observeOn(
    AndroidSchedulers.mainThread())

fun <T> Single<T>.async(): Single<T> = subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

fun Completable.async(): Completable = subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

fun <T> Maybe<T>.async(): Maybe<T> = subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

fun <T> Flowable<T>.async(): Flowable<T> = subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())