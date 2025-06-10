"use client";

import * as React from "react";
import type { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id as LocaleID } from "date-fns/locale";
import type { DailyReportFormInputs, ShiftRange } from "@/types";

interface GeneralInfoFormSectionProps {
  formControl: Control<DailyReportFormInputs>;
}

const shiftRangeOptions: { value: ShiftRange; label: string }[] = [
  { value: "PAGI_SIANG", label: "Pagi ke Siang" },
  { value: "SIANG_MALAM", label: "Siang ke Malam" },
  { value: "MALAM_PAGI", label: "Malam ke Pagi" },
];

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export default function GeneralInfoFormSection({ formControl }: GeneralInfoFormSectionProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>Informasi Umum</CardTitle>
        <CardDescription>Pilih tanggal laporan dan rentang waktu shift yang dicakup.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={formControl}
            name="tanggalLaporan"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Laporan</FormLabel>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-muted",
                          !isValidDate(field.value) && "text-muted-foreground"
                        )}
                      >
                        {isValidDate(field.value) ? (
                          format(field.value, "PPP", { locale: LocaleID })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={isValidDate(field.value) ? field.value : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                        setIsDatePickerOpen(false);
                      }}
                      // Batasan 'disabled' dihilangkan agar semua tanggal dapat dipilih
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formControl}
            name="selectedShiftRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rentang Shift</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn("w-full bg-muted")}>
                      <SelectValue placeholder="Pilih rentang shift" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {shiftRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}