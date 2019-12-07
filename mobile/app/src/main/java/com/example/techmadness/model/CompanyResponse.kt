package com.example.techmadness.model

import com.google.gson.annotations.SerializedName

class CompanyResponse {
    @SerializedName("id")
    var id: String = ""
    @SerializedName("name")
    var name: String = ""
    @SerializedName("")
    var balance: String = "balance"
    @SerializedName("")
    var success: String = "success"
    @SerializedName("error")
    var error: String = ""
}