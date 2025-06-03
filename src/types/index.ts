
import { z } from 'zod';

export const PenghuniSchema = z.object({
  tahananL: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  tahananP: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  narapidanaL: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  narapidanaP: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  jumlahWBPDidalam: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  jumlahWBPDiluar: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
});

// PersonilShiftSchema sekarang memiliki field opsional, superRefine akan memberlakukannya
export const PersonilShiftSchema = z.object({
  rupamId: z.string().optional(), // Menjadi opsional di sini
  keterangan: z.string().optional(), // Menjadi opsional di sini
});

export const PetugasPiketSchema = z.object({
  perwiraPiket: z.array(z.string()), // Dihapus .min(1, "...")
  dapur: z.array(z.string()), // Dihapus .min(1, "...")
  piketBlokWanita: z.array(z.string()), // Dihapus .min(1, "...")
  piketStaffKPR: z.array(z.string()), // Dihapus .min(1, "...")
  piketStaffSiang: z.array(z.string()), // Dihapus .min(1, "...")
});

export const InventarisSchema = z.object({
  senjataApiP3A: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  amunisiP3AKaret: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  borgol: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  metalDetector: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  ht: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  senter: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  lonceng: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  cctv: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  sepatuBoot: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  payung: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
});

export const ShiftRangeEnum = z.enum(["PAGI_SIANG", "SIANG_MALAM", "MALAM_PAGI"], {
  required_error: "Rentang shift harus dipilih.",
});
export type ShiftRange = z.infer<typeof ShiftRangeEnum>;


export const DailyReportSchema = z.object({
  tanggalLaporan: z.date({ required_error: "Tanggal laporan harus diisi." }),
  selectedShiftRange: ShiftRangeEnum,
  penghuni: PenghuniSchema,
  personilPagi: PersonilShiftSchema.optional(),
  personilSiang: PersonilShiftSchema.optional(),
  personilMalam: PersonilShiftSchema.optional(),
  petugasPiket: PetugasPiketSchema,
  inventaris: InventarisSchema,
  kejadianPenting: z.string().optional(),
}).superRefine((data, ctx) => {
  // Fungsi ini akan memeriksa apakah field wajib untuk shift yang AKTIF sudah terisi.
  const validateActiveShift = (
    shiftData: z.infer<typeof PersonilShiftSchema> | undefined, // Akan selalu berupa objek karena defaultValues
    pathPrefix: "personilPagi" | "personilSiang" | "personilMalam",
    displayName: string
  ) => {
    // Karena shiftData selalu ada objeknya (dari defaultValues),
    // kita langsung cek field di dalamnya.
    if (!shiftData?.rupamId || shiftData.rupamId.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Rupam untuk ${displayName} harus dipilih.`,
        path: [pathPrefix, 'rupamId'],
      });
    }

    if (!shiftData?.keterangan || shiftData.keterangan.trim() === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Keterangan untuk ${displayName} harus diisi.`,
            path: [pathPrefix, 'keterangan']
        });
    }
  };

  switch (data.selectedShiftRange) {
    case "PAGI_SIANG":
      validateActiveShift(data.personilPagi, "personilPagi", "Personil Pagi");
      validateActiveShift(data.personilSiang, "personilSiang", "Personil Siang");
      break;
    case "SIANG_MALAM":
      validateActiveShift(data.personilSiang, "personilSiang", "Personil Siang");
      validateActiveShift(data.personilMalam, "personilMalam", "Personil Malam");
      break;
    case "MALAM_PAGI":
      validateActiveShift(data.personilMalam, "personilMalam", "Personil Malam");
      validateActiveShift(data.personilPagi, "personilPagi", "Personil Pagi (Berikutnya)");
      break;
  }
});

export type DailyReportFormInputs = z.infer<typeof DailyReportSchema>;

export interface Pegawai {
  id: string;
  namaLengkap: string;
}

export interface RupamData {
  id: string;
  nama: string;
  karupam: string;
  anggota: string[];
  petugasP2U: string;
}

