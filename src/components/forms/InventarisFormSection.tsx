
"use client";

import type { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DailyReportFormInputs } from "@/types";
import { cn } from "@/lib/utils";

interface InventarisFormSectionProps {
  formControl: Control<DailyReportFormInputs>;
}

export default function InventarisFormSection({ formControl }: InventarisFormSectionProps) {
  const inventarisFields = [
    { name: "inventaris.senjataApiP3A", label: "Senjata Api P3A" },
    { name: "inventaris.amunisiP3AKaret", label: "Amunisi P3A Karet" },
    { name: "inventaris.borgol", label: "Borgol" },
    { name: "inventaris.metalDetector", label: "Metal Detector" },
    { name: "inventaris.ht", label: "HT" },
    { name: "inventaris.senter", label: "Senter" },
    { name: "inventaris.lonceng", label: "Lonceng" },
    { name: "inventaris.cctv", label: "CCTV" },
    { name: "inventaris.sepatuBoot", label: "Sepatu Boot" },
    { name: "inventaris.payung", label: "Payung" },
  ] as const;

  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>C. Inventaris Regu Pengamanan</CardTitle>
        <CardDescription>Jumlah setiap item inventaris bersifat tetap dan tidak dapat diubah.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pt-0">
        {inventarisFields.map(item => (
          <FormField
            key={item.name}
            control={formControl}
            name={item.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    disabled
                    className={cn("bg-muted/80 dark:bg-zinc-800 dark:border-zinc-800")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}
