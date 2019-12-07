package com.example.techmadness.model

import com.google.gson.annotations.SerializedName

data class User(
    var login: String = "",
    var name: String = "",
    var surname: String = "",
    var patronymic: String = "",
    var role: String = "",
    var companyId: String = ""
)