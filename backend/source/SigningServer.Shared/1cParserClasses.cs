using System.Xml.Serialization;

namespace SigningServer.Shared
{
    [XmlRoot(ElementName = "SchmeNm", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class SchmeNm
    {
        [XmlElement(ElementName = "Cd", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Cd { get; set; }
    }

    [XmlRoot(ElementName = "Othr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Othr
    {
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Id { get; set; }
        [XmlElement(ElementName = "SchmeNm", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public SchmeNm SchmeNm { get; set; }
    }

    [XmlRoot(ElementName = "OrgId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class OrgId
    {
        [XmlElement(ElementName = "Othr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Othr Othr { get; set; }
    }

    [XmlRoot(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Id
    {
        [XmlElement(ElementName = "OrgId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public OrgId OrgId { get; set; }
        [XmlElement(ElementName = "Othr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Othr Othr { get; set; }
    }

    [XmlRoot(ElementName = "InitgPty", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class InitgPty
    {
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Id Id { get; set; }
    }

    [XmlRoot(ElementName = "GrpHdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class GrpHdr
    {
        [XmlElement(ElementName = "MsgId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string MsgId { get; set; }
        [XmlElement(ElementName = "CreDtTm", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string CreDtTm { get; set; }
        [XmlElement(ElementName = "NbOfTxs", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string NbOfTxs { get; set; }
        [XmlElement(ElementName = "CtrlSum", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string CtrlSum { get; set; }
        [XmlElement(ElementName = "InitgPty", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public InitgPty InitgPty { get; set; }
    }

    [XmlRoot(ElementName = "SvcLvl", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class SvcLvl
    {
        [XmlElement(ElementName = "Prtry", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Prtry { get; set; }
    }

    [XmlRoot(ElementName = "CtgyPurp", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CtgyPurp
    {
        [XmlElement(ElementName = "Prtry", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Prtry { get; set; }
    }

    [XmlRoot(ElementName = "PmtTpInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class PmtTpInf
    {
        [XmlElement(ElementName = "SvcLvl", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public SvcLvl SvcLvl { get; set; }
        [XmlElement(ElementName = "CtgyPurp", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CtgyPurp CtgyPurp { get; set; }
    }

    [XmlRoot(ElementName = "PstlAdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class PstlAdr
    {
        [XmlElement(ElementName = "Ctry", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Ctry { get; set; }
    }

    [XmlRoot(ElementName = "CtctDtls", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CtctDtls
    {
        [XmlElement(ElementName = "PhneNb", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string PhneNb { get; set; }
        [XmlElement(ElementName = "Othr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Othr { get; set; }
    }

    [XmlRoot(ElementName = "Dbtr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Dbtr
    {
        [XmlElement(ElementName = "Nm", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Nm { get; set; }
        [XmlElement(ElementName = "PstlAdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PstlAdr PstlAdr { get; set; }
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Id Id { get; set; }
        [XmlElement(ElementName = "CtctDtls", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CtctDtls CtctDtls { get; set; }
    }

    [XmlRoot(ElementName = "DbtrAcct", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class DbtrAcct
    {
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Id Id { get; set; }
        [XmlElement(ElementName = "Ccy", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Ccy { get; set; }
    }

    [XmlRoot(ElementName = "ClrSysMmbId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class ClrSysMmbId
    {
        [XmlElement(ElementName = "MmbId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string MmbId { get; set; }
    }

    [XmlRoot(ElementName = "FinInstnId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class FinInstnId
    {
        [XmlElement(ElementName = "ClrSysMmbId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public ClrSysMmbId ClrSysMmbId { get; set; }
        [XmlElement(ElementName = "PstlAdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PstlAdr PstlAdr { get; set; }
    }

    [XmlRoot(ElementName = "DbtrAgt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class DbtrAgt
    {
        [XmlElement(ElementName = "FinInstnId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public FinInstnId FinInstnId { get; set; }
    }

    [XmlRoot(ElementName = "PmtId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class PmtId
    {
        [XmlElement(ElementName = "InstrId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string InstrId { get; set; }
        [XmlElement(ElementName = "EndToEndId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string EndToEndId { get; set; }
    }

    [XmlRoot(ElementName = "InstdAmt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class InstdAmt
    {
        [XmlAttribute(AttributeName = "Ccy")]
        public string Ccy { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "Amt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Amt
    {
        [XmlElement(ElementName = "InstdAmt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public InstdAmt InstdAmt { get; set; }
    }

    [XmlRoot(ElementName = "CdtrAgt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CdtrAgt
    {
        [XmlElement(ElementName = "FinInstnId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public FinInstnId FinInstnId { get; set; }
    }

    [XmlRoot(ElementName = "Cdtr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Cdtr
    {
        [XmlElement(ElementName = "Nm", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Nm { get; set; }
        [XmlElement(ElementName = "PstlAdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PstlAdr PstlAdr { get; set; }
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Id Id { get; set; }
    }

    [XmlRoot(ElementName = "CdtrAcct", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CdtrAcct
    {
        [XmlElement(ElementName = "Id", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Id Id { get; set; }
    }

    [XmlRoot(ElementName = "Purp", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Purp
    {
        [XmlElement(ElementName = "Prtry", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Prtry { get; set; }
    }

    [XmlRoot(ElementName = "RmtInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class RmtInf
    {
        [XmlElement(ElementName = "Ustrd", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string Ustrd { get; set; }
    }

    [XmlRoot(ElementName = "CdtTrfTxInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CdtTrfTxInf
    {
        [XmlElement(ElementName = "PmtId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PmtId PmtId { get; set; }
        [XmlElement(ElementName = "Amt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Amt Amt { get; set; }
        [XmlElement(ElementName = "CdtrAgt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CdtrAgt CdtrAgt { get; set; }
        [XmlElement(ElementName = "Cdtr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Cdtr Cdtr { get; set; }
        [XmlElement(ElementName = "CdtrAcct", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CdtrAcct CdtrAcct { get; set; }
        [XmlElement(ElementName = "Purp", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Purp Purp { get; set; }
        [XmlElement(ElementName = "RmtInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public RmtInf RmtInf { get; set; }
    }

    [XmlRoot(ElementName = "PmtInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class PmtInf
    {
        [XmlElement(ElementName = "PmtInfId", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string PmtInfId { get; set; }
        [XmlElement(ElementName = "PmtMtd", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string PmtMtd { get; set; }
        [XmlElement(ElementName = "PmtTpInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PmtTpInf PmtTpInf { get; set; }
        [XmlElement(ElementName = "ReqdExctnDt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string ReqdExctnDt { get; set; }
        [XmlElement(ElementName = "Dbtr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public Dbtr Dbtr { get; set; }
        [XmlElement(ElementName = "DbtrAcct", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public DbtrAcct DbtrAcct { get; set; }
        [XmlElement(ElementName = "DbtrAgt", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public DbtrAgt DbtrAgt { get; set; }
        [XmlElement(ElementName = "ChrgBr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public string ChrgBr { get; set; }
        [XmlElement(ElementName = "CdtTrfTxInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CdtTrfTxInf CdtTrfTxInf { get; set; }
    }

    [XmlRoot(ElementName = "CstmrCdtTrfInitn", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class CstmrCdtTrfInitn
    {
        [XmlElement(ElementName = "GrpHdr", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public GrpHdr GrpHdr { get; set; }
        [XmlElement(ElementName = "PmtInf", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public PmtInf PmtInf { get; set; }
    }

    [XmlRoot(ElementName = "Document", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
    public class Document1C
    {
        [XmlElement(ElementName = "CstmrCdtTrfInitn", Namespace = "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03")]
        public CstmrCdtTrfInitn CstmrCdtTrfInitn { get; set; }
        [XmlAttribute(AttributeName = "xmlns")]
        public string Xmlns { get; set; }
    }

}
