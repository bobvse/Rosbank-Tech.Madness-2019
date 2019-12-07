package com.example.techmadness.model

import com.google.gson.annotations.SerializedName

class CompanyResponse {
    @SerializedName("id")
    var id: String = ""
    @SerializedName("name")
    var name: String = ""
    @SerializedName("balance")
    var balance: String = ""
    @SerializedName("success")
    var success: String = ""
    @SerializedName("error")
    var error: String = ""
}