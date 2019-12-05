package com.example.techmadness.core.extensions

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.techmadness.navigation.InitParams

private const val BF_INIT_PARAMS = ".init.params"

fun <T : InitParams> Fragment.extractInitParams(): T {
    return arguments?.getParcelable(BF_INIT_PARAMS) ?: throw java.lang.IllegalStateException("initParams should not be null")
}

fun <T : Fragment> T.putInitParams(initParams: InitParams) {
    arguments = Bundle().apply {
        putParcelable(BF_INIT_PARAMS, initParams)
    }
}