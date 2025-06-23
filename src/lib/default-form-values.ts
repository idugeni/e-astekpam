import type { DailyReportFormInputs } from "@/types";

export const defaultDailyReportFormValues: DailyReportFormInputs = {
  tanggalLaporan: new Date(),
  selectedShiftRange: "PAGI_SIANG",
  penghuni: {
    tahananL: 51,
    tahananP: 0,
    narapidanaL: 63,
    narapidanaP: 1,
    jumlahWBPDidalam: 115,
    jumlahWBPDiluar: 0,
  },
  personilPagi: { rupamId: "", keterangan: "Hadir Lengkap" },
  personilSiang: { rupamId: "", keterangan: "Hadir Lengkap" },
  personilMalam: { rupamId: "", keterangan: "Hadir Lengkap" },
  petugasPiket: {
    perwiraPiket: [],
    dapur: [],
    piketBlokWanita: [],
    piketStaffKPR: [],
    piketStaffSiang: [],
  },
  inventaris: {
    senjataApiP3A: 1,
    amunisiP3AKaret: 10,
    borgol: 2,
    metalDetector: 1,
    ht: 6,
    senter: 1,
    lonceng: 5,
    cctv: 16,
    sepatuBoot: 2,
    payung: 2,
  },
  kejadianPenting: "",
};