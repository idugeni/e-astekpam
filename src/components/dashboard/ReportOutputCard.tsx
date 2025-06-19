
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
{/* Container Utama: 
  - `sm:justify-center` dihapus karena kita ingin item meregang, bukan hanya berkumpul di tengah.
  - `sm:items-center` dipertahankan untuk alignment vertikal yang rapi.
*/}
<div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center">

{/* Tombol Individu:
  - `sm:w-auto` diganti dengan `sm:flex-1`.
  - `w-full` tetap untuk tampilan mobile.
  - `sm:flex-1` membuat tombol ini meregang dan mengisi ruang di desktop.
*/}
<Button onClick={onDownloadReport} className="w-full sm:flex-1" disabled={isSubmitting || isEmailing}>
  <Download className="mr-2 h-4 w-4" />
  Unduh Laporan (.txt)
</Button>

<Button onClick={onCopyToClipboard} className="w-full sm:flex-1" disabled={isSubmitting || isEmailing}>
  <Copy className="mr-2 h-4 w-4" />
  Salin Laporan
</Button>

<Button 
  onClick={onSendToWhatsApp} 
  className="w-full sm:flex-1" 
  disabled={!generatedReport || isSubmitting || isEmailing}
>
  <Send className="mr-2 h-4 w-4" />
  Kirim ke WhatsApp
</Button>

{/* Grup Input Email:
  - DIV ini sekarang juga diperlakukan sebagai item flex yang bisa meregang (`sm:flex-1`).
  - Kelas internalnya disederhanakan menjadi `flex items-center gap-2`.
*/}
<div className="flex items-center w-full sm:flex-1 gap-2">
  {/* Input Email:
    - Diberi `flex-1` agar mengisi ruang di DALAM grupnya sendiri.
  */}
  <Input 
    type="email" 
    placeholder="Email penerima" 
    value={emailRecipient}
    onChange={(e) => onEmailRecipientChange(e.target.value)}
    className={cn("flex-1 bg-muted dark:bg-zinc-700 dark:border-zinc-700")}
    disabled={isSubmitting || isEmailing}
  />
  {/* Tombol Kirim Email:
    - Semua kelas width dihilangkan agar lebarnya natural.
    - `flex-shrink-0` ditambahkan untuk mencegahnya menyusut.
  */}
  <Button 
    onClick={onEmailReport} 
    disabled={isEmailing || isSubmitting || !emailRecipient} 
    className="flex-shrink-0"
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
