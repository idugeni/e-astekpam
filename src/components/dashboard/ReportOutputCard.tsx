
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
      <CardHeader>
        <CardTitle className="text-xl font-headline">Hasil Laporan</CardTitle>
        <CardDescription>Laporan yang berhasil dibuat. Anda dapat mengunduh, menyalin, mengirim via WhatsApp, atau mengirimkannya via email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={generatedReport}
          readOnly
          rows={20}
          className={cn("font-mono text-sm p-4 rounded-md bg-muted dark:bg-zinc-700 dark:border-zinc-700")}
        />
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Button onClick={onDownloadReport} className="w-full sm:w-auto" disabled={isSubmitting || isEmailing}>
            <Download className="mr-2 h-4 w-4" />
            Unduh Laporan (.txt)
          </Button>
          <Button onClick={onCopyToClipboard} className="w-full sm:w-auto" disabled={isSubmitting || isEmailing}>
            <Copy className="mr-2 h-4 w-4" />
            Salin Laporan
          </Button>
          <Button 
            onClick={onSendToWhatsApp} 
            className="w-full sm:w-auto" 
            disabled={!generatedReport || isSubmitting || isEmailing}
          >
            <Send className="mr-2 h-4 w-4" />
            Kirim ke WhatsApp
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto sm:flex-grow">
            <Input 
              type="email" 
              placeholder="Email penerima" 
              value={emailRecipient}
              onChange={(e) => onEmailRecipientChange(e.target.value)}
              className={cn("sm:flex-grow bg-muted dark:bg-zinc-700 dark:border-zinc-700")}
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
        </div>
      </CardContent>
    </Card>
  );
}
