
"use client";

import React, { useState } from 'react';
import { DailyReportForm } from '@/components/forms/DailyReportForm';
import type { DailyReportFormInputs } from '@/types';
import { submitDailyReport, emailReportAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import type { FieldErrors } from 'react-hook-form';
import ReportOutputCard from '@/components/dashboard/ReportOutputCard';

export default function DashboardPage() {
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [reportDateForEmail, setReportDateForEmail] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState<string>("");
  const { toast } = useToast();

  const handleFormSubmit = async (data: DailyReportFormInputs) => {
    setIsSubmitting(true);
    setGeneratedReport(null);
    const result = await submitDailyReport(data, undefined); 
    if (result.success && result.reportText) {
      setGeneratedReport(result.reportText);
      setReportDateForEmail(data.tanggalLaporan);
      toast({ 
        title: "Laporan Berhasil Dibuat", 
        description: `ID Laporan: ${result.reportId}, Disimpan di: ${result.storagePath}`,
        variant: "default" 
      });

      try {
        await navigator.clipboard.writeText(result.reportText);
        toast({ 
          title: "Laporan Disalin", 
          description: "Teks laporan telah disalin ke clipboard.",
          variant: "default" 
        });
      } catch (err) {
        console.error("Failed to copy report to clipboard:", err);
        toast({ 
          title: "Gagal Menyalin", 
          description: "Tidak dapat menyalin laporan ke clipboard secara otomatis. Silakan salin manual.",
          variant: "destructive" 
        });
      }

    } else {
      toast({ 
        title: "Gagal Membuat Laporan", 
        description: result.error,
        variant: "destructive" 
      });
    }
    setIsSubmitting(false);
  };

  const getDeepErrorMessages = (errorsObject: any): string[] => {
    const messages: string[] = [];
    const recurse = (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (value && typeof value.message === 'string') {
            messages.push(value.message);
          } else if (typeof value === 'object' && value !== null && !value.ref) { 
            recurse(value);
          }
        }
      }
    };
    recurse(errorsObject);
    return messages;
  };
  
  const handleFormInvalid = (errors: FieldErrors<DailyReportFormInputs>) => {
    const allErrorMessages = getDeepErrorMessages(errors);
    const errorCount = allErrorMessages.length;

    let toastDescription = `Terdapat ${errorCount} kesalahan pada isian formulir. Silakan periksa kembali semua field yang ditandai.`;

    if (errorCount > 0 && allErrorMessages[0]) {
      toastDescription = `Kesalahan: "${allErrorMessages[0]}"`;
      if (errorCount > 1) {
        toastDescription += ` (dan ${errorCount - 1} lainnya).`;
      } else {
        toastDescription += ".";
      }
      toastDescription += " Silakan periksa field yang ditandai untuk detailnya.";
    }
    
    toast({ 
      title: "Gagal Membuat Laporan", 
      description: toastDescription,
      variant: "destructive",
    });
  };

  const handleDownloadReport = () => {
    if (!generatedReport || !reportDateForEmail) return;
    const blob = new Blob([generatedReport], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const now = reportDateForEmail;
    const fileName = `ASTEKPAM_WONOSOBO_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(new Date().getHours()).padStart(2, '0')}-${String(new Date().getMinutes()).padStart(2, '0')}.txt`;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ 
      title: "Laporan Diunduh", 
      description: fileName,
      variant: "default" 
    });
  };
  
  const handleCopyToClipboard = async () => {
    if (!generatedReport) {
      toast({ 
        title: "Tidak Ada Laporan", 
        description: "Buat laporan terlebih dahulu.",
        variant: "default"
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedReport);
      toast({ 
        title: "Laporan Disalin", 
        description: "Teks laporan telah disalin ke clipboard.",
        variant: "default" 
      });
    } catch (err) {
      console.error("Failed to copy report to clipboard:", err);
      toast({ 
        title: "Gagal Menyalin", 
        description: "Tidak dapat menyalin laporan ke clipboard.",
        variant: "destructive" 
      });
    }
  };

  const handleSendToWhatsApp = () => {
    if (!generatedReport) {
      toast({ 
        title: "Tidak Ada Laporan", 
        description: "Buat laporan terlebih dahulu.",
        variant: "default" 
      });
      return;
    }
    const encodedText = encodeURIComponent(generatedReport);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    toast({ 
      title: "Membuka WhatsApp", 
      description: "Silakan pilih kontak dan kirim laporan.",
      variant: "default" 
    });
  };
  
  const handleEmailReport = async () => {
    if (!generatedReport || !reportDateForEmail) {
      toast({ 
        title: "Tidak Ada Laporan", 
        description: "Buat laporan terlebih dahulu.",
        variant: "default" 
      });
      return;
    }
    if (!emailRecipient) {
      toast({ 
        title: "Email Penerima Kosong", 
        description: "Masukkan alamat email penerima.",
        variant: "destructive"
      });
      return;
    }
    setIsEmailing(true);
    const result = await emailReportAction(generatedReport, reportDateForEmail, emailRecipient);
    if (result.success) {
      toast({ 
        title: "Email Terkirim", 
        description: result.message,
        variant: "default" 
      });
    } else {
      toast({ 
        title: "Gagal Mengirim Email", 
        description: result.error,
        variant: "destructive" 
      });
    }
    setIsEmailing(false);
  };

  return (
    <div className="space-y-8">
      <DailyReportForm 
        onSubmit={handleFormSubmit} 
        onInvalid={handleFormInvalid}
        isLoading={isSubmitting} 
      />

      {generatedReport && (
        <ReportOutputCard
          generatedReport={generatedReport}
          emailRecipient={emailRecipient}
          onEmailRecipientChange={setEmailRecipient}
          isSubmitting={isSubmitting}
          isEmailing={isEmailing}
          onDownloadReport={handleDownloadReport}
          onCopyToClipboard={handleCopyToClipboard}
          onSendToWhatsApp={handleSendToWhatsApp}
          onEmailReport={handleEmailReport}
        />
      )}
    </div>
  );
}
