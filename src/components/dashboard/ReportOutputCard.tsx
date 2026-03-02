"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, Loader2, Copy, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ReportOutputCardProps {
  generatedReport: string;
  emailRecipient: string;
  onEmailRecipientChange: (value: string) => void;
  isSubmitting: boolean;
  isEmailing: boolean;
  onDownloadReport: () => void;
  onCopyToClipboard: () => void;
  onSendToWhatsApp: () => void;
  onEmailReport: () => void;
}

export default function ReportOutputCard({
  generatedReport,
  emailRecipient,
  onEmailRecipientChange,
  isSubmitting,
  isEmailing,
  onDownloadReport,
  onCopyToClipboard,
  onSendToWhatsApp,
  onEmailReport,
}: ReportOutputCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1 p-4 sm:p-6">
        <CardTitle className="text-lg font-headline sm:text-xl">Hasil Laporan</CardTitle>
        <CardDescription>
          Laporan yang berhasil dibuat. Anda dapat mengunduh, menyalin, mengirim via WhatsApp, atau
          mengirimkannya via email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <Textarea
          value={generatedReport}
          readOnly
          rows={16}
          className={cn('max-h-[40svh] min-h-[18rem] font-mono text-xs leading-relaxed sm:text-sm p-3 sm:p-4 rounded-md bg-muted dark:bg-zinc-700 dark:border-zinc-700')}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <Button onClick={onDownloadReport} className="w-full" disabled={isSubmitting || isEmailing}>
            <Download className="mr-2 h-4 w-4" />
            Unduh Laporan (.txt)
          </Button>

          <Button onClick={onCopyToClipboard} className="w-full" disabled={isSubmitting || isEmailing}>
            <Copy className="mr-2 h-4 w-4" />
            Salin Laporan
          </Button>

          <Button
            onClick={onSendToWhatsApp}
            className="w-full sm:col-span-2"
            disabled={!generatedReport || isSubmitting || isEmailing}
          >
            <Send className="mr-2 h-4 w-4" />
            Kirim ke WhatsApp
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            type="email"
            placeholder="Email penerima"
            value={emailRecipient}
            onChange={(e) => onEmailRecipientChange(e.target.value)}
            className={cn('w-full bg-muted dark:bg-zinc-700 dark:border-zinc-700')}
            disabled={isSubmitting || isEmailing}
          />
          <Button
            onClick={onEmailReport}
            disabled={isEmailing || isSubmitting || !emailRecipient}
            className="w-full sm:w-auto"
          >
            {isEmailing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            Kirim via Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
