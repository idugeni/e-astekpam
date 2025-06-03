
"use client";

import * as React from "react";
import type { Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { DailyReportFormInputs } from "@/types";
import { cn } from "@/lib/utils";

interface PenghuniFormSectionProps {
  control: Control<DailyReportFormInputs>;
  watch: UseFormWatch<DailyReportFormInputs>;
  setValue: UseFormSetValue<DailyReportFormInputs>;
}

export default function PenghuniFormSection({ control, watch, setValue }: PenghuniFormSectionProps) {
  const tahananL = watch("penghuni.tahananL");
  const tahananP = watch("penghuni.tahananP");
  const narapidanaL = watch("penghuni.narapidanaL");
  const narapidanaP = watch("penghuni.narapidanaP");
  const jumlahWBPDiluar = watch("penghuni.jumlahWBPDiluar");

  React.useEffect(() => {
    const tl = Number(tahananL) || 0;
    const tp = Number(tahananP) || 0;
    const nl = Number(narapidanaL) || 0;
    const np = Number(narapidanaP) || 0;
    const wbpDiluar = Number(jumlahWBPDiluar) || 0;

    const totalPenghuniRaw = tl + tp + nl + np;
    const newJumlahWBPDidalam = totalPenghuniRaw - wbpDiluar;
    
    setValue("penghuni.jumlahWBPDidalam", newJumlahWBPDidalam >= 0 ? newJumlahWBPDidalam : 0, { shouldValidate: true });

  }, [tahananL, tahananP, narapidanaL, narapidanaP, jumlahWBPDiluar, setValue]);
  
  type PenghuniFieldNames = 
    | "penghuni.tahananL"
    | "penghuni.tahananP"
    | "penghuni.narapidanaL"
    | "penghuni.narapidanaP"
    | "penghuni.jumlahWBPDiluar";

  const renderNumericInputWithControls = (
    name: PenghuniFieldNames,
    label: string
  ) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative flex items-center">
            <FormControl>
              <Input 
                type="number" 
                placeholder="0" 
                {...field} 
                onChange={e => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                value={field.value === null || field.value === undefined ? '' : String(field.value)}
                className={cn("pr-20 bg-muted")}
              />
            </FormControl>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center space-x-0.5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full" 
                onClick={() => {
                  const currentValue = Number(field.value) || 0;
                  setValue(name, Math.max(0, currentValue - 1), { shouldValidate: true, shouldDirty: true });
                }}
                disabled={field.value === 0 || field.value === null || field.value === undefined}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Kurangi</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full" 
                onClick={() => {
                  const currentValue = Number(field.value) || 0;
                  setValue(name, currentValue + 1, { shouldValidate: true, shouldDirty: true });
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Tambah</span>
              </Button>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );


  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>A. Data Penghuni</CardTitle>
        <CardDescription>Masukkan jumlah tahanan dan narapidana. Jumlah WBP di Dalam akan terhitung otomatis.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-4">
        {renderNumericInputWithControls("penghuni.tahananL", "Tahanan Laki-laki")}
        {renderNumericInputWithControls("penghuni.tahananP", "Tahanan Perempuan")}
        {renderNumericInputWithControls("penghuni.narapidanaL", "Narapidana Laki-laki")}
        {renderNumericInputWithControls("penghuni.narapidanaP", "Narapidana Perempuan")}
        {renderNumericInputWithControls("penghuni.jumlahWBPDiluar", "Jumlah WBP di Luar")}
        
        <FormField
          control={control}
          name="penghuni.jumlahWBPDidalam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah WBP di Dalam (Otomatis)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field} 
                  readOnly 
                  value={field.value === null || field.value === undefined ? '' : String(field.value)}
                  className={cn("bg-muted/80 dark:bg-zinc-800 dark:border-zinc-800")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
