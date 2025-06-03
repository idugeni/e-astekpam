
"use client";

import * as React from "react";
import type { Control } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { DailyReportFormInputs, RupamData } from "@/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PersonilShiftFormSectionProps {
  formControl: Control<DailyReportFormInputs>;
  shift: "Pagi" | "Siang" | "Malam";
  rupamList: RupamData[];
}

export default function PersonilShiftFormSection({
  formControl,
  shift,
  rupamList,
}: PersonilShiftFormSectionProps) {
  const fieldPrefix =
    shift === "Pagi" ? "personilPagi" :
    shift === "Siang" ? "personilSiang" :
    "personilMalam";

  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>B. Personil Pengamanan - RUPAM {shift.toLocaleUpperCase()}</CardTitle>
        <CardDescription>Pilih Rupam yang bertugas dan masukkan keterangan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0">
        <FormField
          control={formControl}
          name={`${fieldPrefix}.rupamId`}
          render={({ field }) => {
            const selectedRupamDetails = React.useMemo(() => {
              if (field.value) {
                return rupamList.find(r => r.id === field.value) || null;
              }
              return null;
            }, [field.value, rupamList]);

            return (
              <FormItem>
                <FormLabel>Pilih Rupam</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className={cn("bg-muted")}>
                      <SelectValue placeholder={`Pilih Rupam ${shift}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rupamList.map(rupam => (
                      <SelectItem key={`${fieldPrefix}-rupam-${rupam.id}`} value={rupam.id}>
                        {rupam.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />

                {selectedRupamDetails && (
                  <Card className="mt-4">
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Karupam</Label>
                        <p className="text-sm text-foreground">{selectedRupamDetails.karupam || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Anggota Rupam</Label>
                        <ul className="list-disc list-inside pl-1 text-sm text-foreground">
                          {selectedRupamDetails.anggota.length > 0 ? (
                            selectedRupamDetails.anggota.map((anggota, index) => (
                              <li key={`${fieldPrefix}-anggota-display-${index}`}>{anggota}</li>
                            ))
                          ) : (
                            <li>-</li>
                          )}
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Petugas P2U</Label>
                        <p className="text-sm text-foreground">{selectedRupamDetails.petugasP2U || '-'}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </FormItem>
            );
          }}
        />

        <FormField
          control={formControl}
          name={`${fieldPrefix}.keterangan`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Input placeholder="Hadir Lengkap" {...field} className={cn("bg-muted")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
