
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DailyReportSchema, type DailyReportFormInputs } from "@/types";
import rupamDataJson from "@/lib/rupam-data.json";
import type { RupamData } from "@/types";
import { defaultDailyReportFormValues } from "@/lib/default-form-values";
import { Loader2 } from "lucide-react";
import PenghuniFormSection from "./PenghuniFormSection";
import PersonilShiftFormSection from "./PersonilShiftFormSection";
import PetugasPiketFormSection from "./PetugasPiketFormSection";
import InventarisFormSection from "./InventarisFormSection";
import GeneralInfoFormSection from "./GeneralInfoFormSection";
import KejadianPentingFormSection from "./KejadianPentingFormSection";

interface DailyReportFormProps {
  onSubmit: (data: DailyReportFormInputs) => Promise<void>;
  onInvalid?: (errors: FieldErrors<DailyReportFormInputs>) => void;
  isLoading: boolean;
}

const typedRupamData: RupamData[] = rupamDataJson as RupamData[];

export function DailyReportForm({ onSubmit, onInvalid, isLoading }: DailyReportFormProps) {
  const form = useForm<DailyReportFormInputs>({
    resolver: zodResolver(DailyReportSchema),
    shouldUnregister: false,
    defaultValues: defaultDailyReportFormValues,
  });

  const watchedShiftRange = form.watch("selectedShiftRange");

  const renderShiftSections = () => {
    switch (watchedShiftRange) {
      case "PAGI_SIANG":
        return (
          <>
            <PersonilShiftFormSection
              key="personilPagi"
              formControl={form.control}
              shift="Pagi"
              rupamList={typedRupamData}
            />
            <PersonilShiftFormSection
              key="personilSiang"
              formControl={form.control}
              shift="Siang"
              rupamList={typedRupamData}
            />
          </>
        );
      case "SIANG_MALAM":
        return (
          <>
            <PersonilShiftFormSection
              key="personilSiang"
              formControl={form.control}
              shift="Siang"
              rupamList={typedRupamData}
            />
            <PersonilShiftFormSection
              key="personilMalam"
              formControl={form.control}
              shift="Malam"
              rupamList={typedRupamData}
            />
          </>
        );
      case "MALAM_PAGI":
        return (
          <>
            <PersonilShiftFormSection
              key="personilMalam"
              formControl={form.control}
              shift="Malam"
              rupamList={typedRupamData}
            />
            <PersonilShiftFormSection
              key="personilPagi"
              formControl={form.control}
              shift="Pagi"
              rupamList={typedRupamData}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
        
        <GeneralInfoFormSection formControl={form.control} />

        <PenghuniFormSection control={form.control} watch={form.watch} setValue={form.setValue} />
        
        {renderShiftSections()}
        
        <PetugasPiketFormSection formControl={form.control} />
        <InventarisFormSection formControl={form.control} />
        <KejadianPentingFormSection formControl={form.control} />

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Buat Laporan
        </Button>
      </form>
    </Form>
  );
}
