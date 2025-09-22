// src/constants/bankLogos.ts

// Static Imports
import aublLogo from "../assests/assets/aubl.svg";
import barbLogo from "../assests/assets/barb.svg";
import bdblLogo from "../assests/assets/bdbl.svg";
import bkidLogo from "../assests/assets/bkid.svg";
import cbinLogo from "../assests/assets/cbin.svg";
import ciubLogo from "../assests/assets/ciub.svg";
import cnrbLogo from "../assests/assets/cnrb.svg";
import csbkLogo from "../assests/assets/csbk.svg";
import dcblLogo from "../assests/assets/dcbl.svg";
import dlxbLogo from "../assests/assets/dlxb.svg";
import fdrlLogo from "../assests/assets/fdrl.svg";
import hdfcLogo from "../assests/assets/hdfc.svg";
import ikblLogo from "../assests/assets/ibkl.svg";
import icicLogo from "../assests/assets/icic.svg";
import idfbLogo from "../assests/assets/idfb.svg";
import idibLogo from "../assests/assets/idib.svg";
import indbLogo from "../assests/assets/indb.svg";
import iobaLogo from "../assests/assets/ioba.svg";
import jakaLogo from "../assests/assets/jaka.svg";
import karbLogo from "../assests/assets/karb.svg";
import kkbkLogo from "../assests/assets/kkbk.svg";
import kvblLogo from "../assests/assets/kvbl.svg";
import mahbLogo from "../assests/assets/mahb.svg";
import ntblLogo from "../assests/assets/ntbl.svg";
import psibLogo from "../assests/assets/psib.svg";
import punbLogo from "../assests/assets/punb.svg";
import rstnLogo from "../assests/assets/ratn.svg";
import sbinLogo from "../assests/assets/sbin.svg";
import siblLogo from "../assests/assets/sibl.svg";
import tmblLogo from "../assests/assets/tmbl.svg";
import ubinLogo from "../assests/assets/ubin.svg";
import ucbaLogo from "../assests/assets/ucba.svg";
import utibLogo from "../assests/assets/utib.svg";
import yesbLogo from "../assests/assets/yesb.svg";

// Enum: Add one for each known bank code
export enum BankCode {
  AUBL = "aubl",
  BARB = "barb",
  BDBL = "bdbl",
  BKID = "bkid",
  CBIN = "cbin",
  CIUB = "ciub",
  CNRB = "cnrb",
  CSBK = "csbk",
  DCBL = "dcbl",
  DLXB = "dlxb",
  FDRL = "fdrl",
  HDFC = "hdfc",
  IBKL = "ibkl",
  ICIC = "icic",
  IDFB = "idfb",
  IDIB = "idib",
  INDB = "indb",
  IOBA = "ioba",
  JAKA = "jaka",
  KARB = "karb",
  KKBK = "kkbk",
  KVBL = "kvbl",
  MAHB = "mahb",
  NTBL = "ntbl",
  PSIB = "psib",
  PUNB = "punb",
  RATN = "rstn",
  SBIN = "sbin",
  SIBL = "sibl",
  TMBL = "tmbl",
  UBIN = "ubin",
  UCBA = "ucba",
  UTIB = "utib",
  YESB = "yesb",
}

// Map: Enum key to logo
export const bankLogoMap: Record<BankCode, string> = {
  [BankCode.AUBL]: aublLogo,
  [BankCode.BARB]: barbLogo,
  [BankCode.BDBL]: bdblLogo,
  [BankCode.BKID]: bkidLogo,
  [BankCode.CBIN]: cbinLogo,
  [BankCode.CIUB]: ciubLogo,
  [BankCode.CNRB]: cnrbLogo,
  [BankCode.CSBK]: csbkLogo,
  [BankCode.DCBL]: dcblLogo,
  [BankCode.DLXB]: dlxbLogo,
  [BankCode.FDRL]: fdrlLogo,
  [BankCode.HDFC]: hdfcLogo,
  [BankCode.IBKL]: ikblLogo,
  [BankCode.ICIC]: icicLogo,
  [BankCode.IDFB]: idfbLogo,
  [BankCode.IDIB]: idibLogo,
  [BankCode.INDB]: indbLogo,
  [BankCode.IOBA]: iobaLogo,
  [BankCode.JAKA]: jakaLogo,
  [BankCode.KARB]: karbLogo,
  [BankCode.KKBK]: kkbkLogo,
  [BankCode.KVBL]: kvblLogo,
  [BankCode.MAHB]: mahbLogo,
  [BankCode.NTBL]: ntblLogo,
  [BankCode.PSIB]: psibLogo,
  [BankCode.PUNB]: punbLogo,
  [BankCode.RATN]: rstnLogo,
  [BankCode.SBIN]: sbinLogo,
  [BankCode.SIBL]: siblLogo,
  [BankCode.TMBL]: tmblLogo,
  [BankCode.UBIN]: ubinLogo,
  [BankCode.UCBA]: ucbaLogo,
  [BankCode.UTIB]: utibLogo,
  [BankCode.YESB]: yesbLogo,
};

// Getter with fallback
export const getBankLogo = (code: string): string => {
  const normalizedCode = code?.toLowerCase();
  const enumKey = Object.values(BankCode).find((val) => val === normalizedCode);
  return enumKey && bankLogoMap[enumKey as BankCode];
};
