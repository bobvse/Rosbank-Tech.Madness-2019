package com.example.techmadness.model

import com.google.gson.annotations.SerializedName

class UserResponse {
    @SerializedName("login")
    var login: String = ""
    @SerializedName("name")
    var name: String = ""
    @SerializedName("surname")
    var surname: String = ""
    @SerializedName("patronymic")
    var patronymic: String = ""
    @SerializedName("role")
    var role: String = ""
    @SerializedName("companyId")
    var companyId: String = ""
    @SerializedName("success")
    var success: String = ""
    @SerializedName("error")
    var error: String = ""
}