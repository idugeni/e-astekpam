"use server";

import type { DailyReportFormInputs } from "@/types";
import { generateReportText } from "./report-generator";
import { format } from "date-fns";

// Simulate Firebase interactions
async function saveReportToFirestore(reportData: DailyReportFormInputs, reportText: string, userId: string | undefined) {
  const reportId = `report_${format(reportData.tanggalLaporan, 'yyyyMMdd')}_${new Date().getTime()}`;
  console.log(`[Firestore SIMULATION] Saving report ${reportId}:`);
  console.log({ 
    id: reportId,
    submittedBy: userId || "unknown_user",
    createdAt: new Date().toISOString(),
    ...reportData, 
    generatedReportText: reportText.substring(0, 200) + "..." // Log snippet
  });
  // In a real app: await firestore.collection('laporan_harian').add({ ... });
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async
  return { success: true, reportId };
}

async function saveReportToStorage(reportText: string, tanggalLaporan: Date) {
  const fileName = `ASTEKPAM_WONOSOBO_${format(tanggalLaporan, 'yyyy-MM-dd_HH-mm')}.txt`;
  console.log(`[Storage SIMULATION] Saving report to path: /reports/${fileName}`);
  console.log(`Content (first 100 chars): ${reportText.substring(0, 100)}...`);
  // In a real app: await storage.bucket().file(`/reports/${fileName}`).save(reportText);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async
  return { success: true, path: `/reports/${fileName}` };
}

async function sendReportByEmail(reportText: string, fileName: string, recipient: string) {
  console.log(`[Email SIMULATION] Sending report ${fileName} to ${recipient}`);
  console.log(`Attachment content (first 100 chars): ${reportText.substring(0, 100)}...`);
  // In a real app: use an email service like Nodemailer or SendGrid
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async
  return { success: true };
}


export async function submitDailyReport(data: DailyReportFormInputs, userId?: string) {
  try {
    const reportText = generateReportText(data);

    // Simulate saving to Firestore
    const firestoreResult = await saveReportToFirestore(data, reportText, userId);
    if (!firestoreResult.success) {
      throw new Error("Gagal menyimpan laporan ke database.");
    }

    // Simulate saving to Storage
    const storageResult = await saveReportToStorage(reportText, data.tanggalLaporan);
    if (!storageResult.success) {
      throw new Error("Gagal menyimpan file laporan.");
    }
    
    return { success: true, reportText, reportId: firestoreResult.reportId, storagePath: storageResult.path };
  } catch (error) {
    console.error("Error submitting daily report:", error);
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
    console.error("Error emailing report:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim email.";
    return { success: false, error: errorMessage };
  }
}
