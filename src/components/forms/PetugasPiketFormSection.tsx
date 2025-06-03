
"use client";

import type { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { DailyReportFormInputs } from "@/types";
import categorizedPiketPersonnel from "@/lib/categorized-piket-personnel.json"; 
import { cn } from "@/lib/utils";

interface PetugasPiketFormSectionProps {
  formControl: Control<DailyReportFormInputs>;
}

type PiketCategory = keyof typeof categorizedPiketPersonnel;

export default function PetugasPiketFormSection({ formControl }: PetugasPiketFormSectionProps) {
  const piketFields = [
    { name: "petugasPiket.perwiraPiket", label: "Perwira Piket", categoryKey: "perwiraPiket" as PiketCategory },
    { name: "petugasPiket.dapur", label: "Piket Dapur", categoryKey: "dapur" as PiketCategory },
    { name: "petugasPiket.piketBlokWanita", label: "Piket Blok Wanita", categoryKey: "piketBlokWanita" as PiketCategory },
    { name: "petugasPiket.piketStaffKPR", label: "Piket Staff KPR", categoryKey: "piketStaffKPR" as PiketCategory },
    { name: "petugasPiket.piketStaffSiang", label: "Piket Staff Siang", categoryKey: "piketStaffSiang" as PiketCategory },
  ] as const;

  const getSelectedNamesText = (selectedNames: string[] | undefined, defaultText: string) => {
    if (!selectedNames || selectedNames.length === 0) {
      return defaultText;
    }
    if (selectedNames.length <= 2) {
      return selectedNames.join(', ');
    }
    return `${selectedNames.slice(0, 2).join(', ')} dan ${selectedNames.length - 2} lainnya`;
  };

  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>B. Personil Pengamanan - PETUGAS PIKET</CardTitle>
        <CardDescription>Pilih personel yang bertugas untuk setiap kategori piket.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pt-0">
        {piketFields.map(item => {
          const personnelListForCategory = categorizedPiketPersonnel[item.categoryKey] || [];
          return (
            <FormField
              key={item.name}
              control={formControl}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-muted")}>
                          {getSelectedNamesText(field.value, `Pilih ${item.label}`)}
                        </Button>
                      </FormControl>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                      <DropdownMenuLabel>Pilih Petugas</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {personnelListForCategory.length > 0 ? (
                        personnelListForCategory.map(nama => (
                          <DropdownMenuCheckboxItem
                            key={`${item.name}-${nama}`}
                            checked={field.value?.includes(nama)}
                            onCheckedChange={(checked) => {
                              const currentSelection = field.value || [];
                              if (checked) {
                                field.onChange([...currentSelection, nama]);
                              } else {
                                field.onChange(currentSelection.filter(n => n !== nama));
                              }
                            }}
                          >
                            {nama}
                          </DropdownMenuCheckboxItem>
                        ))
                      ) : (
                        <DropdownMenuLabel className="text-muted-foreground text-sm font-normal px-2">Tidak ada personel untuk kategori ini.</DropdownMenuLabel>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
