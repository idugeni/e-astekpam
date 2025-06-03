"use server";

import type { DailyReportFormInputs } from "@/types";
import { generateReportText } from "./report-generator";
import { format } from "date-fns";

async function saveReportToFirestore(reportData: DailyReportFormInputs, reportText: string, userId: string | undefined) {
  const reportId = `report_${format(reportData.tanggalLaporan, 'yyyyMMdd')}_${new Date().getTime()}`;

  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, reportId };
}

async function saveReportToStorage(reportText: string, tanggalLaporan: Date) {
  const fileName = `ASTEKPAM_WONOSOBO_${format(tanggalLaporan, 'yyyy-MM-dd_HH-mm')}.txt`;

  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, path: `/reports/${fileName}` };
}

async function sendReportByEmail(reportText: string, fileName: string, recipient: string) {

  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}


export async function submitDailyReport(data: DailyReportFormInputs, userId?: string) {
  try {
    const reportText = generateReportText(data);

    const firestoreResult = await saveReportToFirestore(data, reportText, userId);
    if (!firestoreResult.success) {
      throw new Error("Gagal menyimpan laporan ke database.");
    }

    const storageResult = await saveReportToStorage(reportText, data.tanggalLaporan);
    if (!storageResult.success) {
      throw new Error("Gagal menyimpan file laporan.");
    }
    
    return { success: true, reportText, reportId: firestoreResult.reportId, storagePath: storageResult.path };
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan server.";
    return { success: false, error: errorMessage };
  }
}

export async function emailReportAction(reportText: string, tanggalLaporan: Date, recipientEmail: string) {
  try {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      return { success: false, error: "Alamat email penerima tidak valid." };
    }
    const fileName = `ASTEKPAM_WONOSOBO_${format(tanggalLaporan, 'yyyy-MM-dd_HH-mm')}.txt`;
    const emailResult = await sendReportByEmail(reportText, fileName, recipientEmail);

    if (!emailResult.success) {
      throw new Error("Gagal mengirim email laporan.");
    }
    return { success: true, message: `Laporan berhasil dikirim ke ${recipientEmail}` };
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim email.";
    return { success: false, error: errorMessage };
  }
}
