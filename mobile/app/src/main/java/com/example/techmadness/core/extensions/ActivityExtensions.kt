package com.example.techmadness.core.extensions

import android.app.Activity
import android.content.Context
import android.content.Intent
import com.example.techmadness.navigation.InitParams

private const val BA_INIT_PARAMS = ".init.params"

fun <T : InitParams> Activity.extractInitParams(): T {
    return intent?.getParcelableExtra(BA_INIT_PARAMS)
        ?: throw java.lang.IllegalStateException("initParams should not be null")
}

fun <T : Intent> T.putInitParams(initParams: InitParams): Intent {
    return putExtra(BA_INIT_PARAMS, initParams)
}

inline fun <reified T : Activity> T.intentFor(context: Context): Intent {
    return Intent(context, T::class.java)
}