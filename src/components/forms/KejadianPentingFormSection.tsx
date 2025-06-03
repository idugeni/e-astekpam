
"use client";

import type { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { DailyReportFormInputs } from "@/types";
import { cn } from "@/lib/utils";

interface KejadianPentingFormSectionProps {
  formControl: Control<DailyReportFormInputs>;
}

export default function KejadianPentingFormSection({ formControl }: KejadianPentingFormSectionProps) {
  return (
    <Card className="py-0">
      <CardHeader className="p-4">
        <CardTitle>Kejadian Penting</CardTitle>
        <CardDescription>Catatan tambahan atau kejadian penting selama shift.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <FormField
          control={formControl}
          name="kejadianPenting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan Kejadian</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tidak ada kejadian menonjol..." 
                  {...field} 
                  rows={4} 
                  className={cn("bg-muted")}
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
