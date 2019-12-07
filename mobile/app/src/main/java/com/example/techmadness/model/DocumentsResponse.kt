package com.example.techmadness.model

import android.telecom.Call.Details
import com.google.gson.annotations.SerializedName
import java.io.Serializable


class DocumentsResponse : Serializable {

    @SerializedName("documents")
    val documents: List<Document>? = null
    @SerializedName("success")
    val success: Boolean? = null
    @SerializedName("error")
    val error: Any? = null

    class Document {
        @SerializedName("id")
        var id: String? = ""
        @SerializedName("companyId")
        var companyId: String?= ""
        @SerializedName("creatorId")
        var creatorId: String? = ""
        @SerializedName("createDate")
        var createDate: String? = ""
        @SerializedName("signDate")
        var signDate: Any?= ""
        @SerializedName("status")
        var status: String? = ""
        @SerializedName("name")
        var name: String? = ""
        @SerializedName("details")
        var details: Details? = null

    }


    class CtgyPurp {
        @SerializedName("prtry")
        var prtry: String? = null

    }

    class ClrSysMmbId {
        @SerializedName("mmbId")
        var mmbId: String? = null

    }

    class FinInstnId {
        @SerializedName("clrSysMmbId")
        var clrSysMmbId: ClrSysMmbId? = null
        @SerializedName("pstlAdr")
        var pstlAdr: PstlAdr? = null

    }

    class FinInstnId_ {
        @SerializedName("clrSysMmbId")
        var clrSysMmbId: ClrSysMmbId? = null
        @SerializedName("pstlAdr")
        var pstlAdr: PstlAdr? = null

    }

    class GrpHdr {
        @SerializedName("msgId")
        var msgId: String? = null
        @SerializedName("creDtTm")
        var creDtTm: String? = null
        @SerializedName("nbOfTxs")
        var nbOfTxs: String? = null
        @SerializedName("ctrlSum")
        var ctrlSum: String? = null
        @SerializedName("initgPty")
        var initgPty: InitgPty? = null
    }

    class Id {
        @SerializedName("orgId")
        var orgId: Any? = null
        @SerializedName("othr")
        var othr: Othr? = null

    }

    class InitgPty {
        @SerializedName("id")
        var id: Id? = null
    }

    class InstdAmt {
        @SerializedName("ccy")
        var ccy: String? = null
        @SerializedName("text")
        var text: String? = null

    }

    class OrgId__ {
        @SerializedName("othr")
        var othr: Othr? = null
    }

    class Othr {
        @SerializedName("id")
        var id: String? = null
        @SerializedName("schmeNm")
        var schmeNm: SchmeNm? = null

    }

    class PmtId {
        @SerializedName("instrId")
        var instrId: String? = null
        @SerializedName("endToEndId")
        var endToEndId: String? = null

    }

    class PmtInf {
        @SerializedName("pmtInfId")
        var pmtInfId: String? = null
        @SerializedName("pmtMtd")
        var pmtMtd: String? = null
        @SerializedName("pmtTpInf")
        var pmtTpInf: PmtTpInf? = null
        @SerializedName("reqdExctnDt")
        var reqdExctnDt: String? = null
        @SerializedName("dbtr")
        var dbtr: Dbtr? = null
        @SerializedName("dbtrAcct")
        var dbtrAcct: DbtrAcct? = null
        @SerializedName("dbtrAgt")
        var dbtrAgt: DbtrAgt? = null
        @SerializedName("chrgBr")
        var chrgBr: String? = null
        @SerializedName("cdtTrfTxInf")
        var cdtTrfTxInf: CdtTrfTxInf? = null

    }

    class DbtrAcct {
        @SerializedName("id")
        var id: Id? = null
        @SerializedName("ccy")
        var ccy: String? = null

    }

    class DbtrAgt {
        @SerializedName("finInstnId")
        var finInstnId: FinInstnId? = null

    }

    class Dbtr {
        @SerializedName("nm")
        var nm: String? = null
        @SerializedName("pstlAdr")
        var pstlAdr: PstlAdr? = null
        @SerializedName("id")
        var id: Id? = null
        @SerializedName("ctctDtls")
        var ctctDtls: CtctDtls? = null

    }

    class CtctDtls {
        @SerializedName("phneNb")
        var phneNb: String? = null
        @SerializedName("othr")
        var othr: String? = null

    }

    class CdtTrfTxInf {
        @SerializedName("pmtId")
        var pmtId: PmtId? = null
        @SerializedName("amt")
        var amt: Amt? = null
        @SerializedName("cdtrAgt")
        var cdtrAgt: CdtrAgt? = null
        @SerializedName("cdtr")
        var cdtr: Cdtr? = null
        @SerializedName("cdtrAcct")
        var cdtrAcct: CdtrAcct? = null
        @SerializedName("purp")
        var purp: Purp? = null
        @SerializedName("rmtInf")
        var rmtInf: RmtInf? = null
    }

    class CdtrAgt {
        @SerializedName("finInstnId")
        var finInstnId: FinInstnId_? = null
    }

    class Amt {
        @SerializedName("instdAmt")
        var instdAmt: InstdAmt? = null

    }

    class Cdtr {
        @SerializedName("nm")
        var nm: String? = null
        @SerializedName("pstlAdr")
        var pstlAdr: PstlAdr? = null
        @SerializedName("id")
        var id: Id? = null
    }

    class CdtrAcct {
        @SerializedName("id")
        var id: Id? = null

    }

    class PmtTpInf {
        @SerializedName("svcLvl")
        var svcLvl: SvcLvl? = null
        @SerializedName("ctgyPurp")
        var ctgyPurp: CtgyPurp? = null

    }

    class PstlAdr {
        @SerializedName("ctry")
        var ctry: String? = null

    }

    class Purp {
        @SerializedName("prtry")
        var prtry: String? = null

    }

    class RmtInf {
        @SerializedName("ustrd")
        var ustrd: String? = null

    }

    class SvcLvl {
        @SerializedName("prtry")
        var prtry: String? = null
    }


    class SchmeNm {
        @SerializedName("cd")
        var cd: String? = null
    }
}