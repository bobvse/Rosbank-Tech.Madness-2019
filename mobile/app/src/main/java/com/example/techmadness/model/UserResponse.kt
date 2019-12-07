package com.example.techmadness.model

import com.google.gson.annotations.SerializedName

class UserResponse {
    @SerializedName("Surname")
    var surname: String = ""
    @SerializedName("Patronymic")
    var Patronymic: String = ""
    @SerializedName("Role")
    var role: String = ""
    @SerializedName("CompanyId ")
    var companyId : String = ""


}