
import type { DailyReportFormInputs, PersonilShiftSchema, RupamData } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { z } from 'zod';
import rupamDataJson from '@/lib/rupam-data.json';

const RUPAM_DATA: RupamData[] = rupamDataJson as RupamData[];

const formatNumberedList = (items: string[]): string => {
  if (!items || items.length === 0) return '  -';
  return items.map((item, index) => `  ${index + 1}. ${item || '-'}`).join('\n');
};

const formatCommaSeparatedList = (items: string[] | undefined): string => {
  if (!items || items.length === 0) {
    return '-';
  }
  return items.join(', ');
};

const padLabel = (label: string, length: number): string => {
  return label.padEnd(length, ' ');
};

const formatPenghuniCount = (count: number | undefined | null): string => {
  const numericCount = Number(count);
  if (isNaN(numericCount) || numericCount < 0) { // Handle null, undefined, NaN correctly
    return "-".padStart(3) + " Orang";
  }
  return String(numericCount).padStart(3) + " Orang";
};

const formatInventarisValue = (count: number | undefined | null): string => {
  const numericCount = Number(count);
  if (isNaN(numericCount) || numericCount < 0) { // Handle null, undefined, NaN correctly
    return "-".padStart(2) + " buah";
  }
  return String(numericCount).padStart(2) + " buah";
};

const generatePersonilShiftText = (shiftData: z.infer<typeof PersonilShiftSchema> | undefined, shiftName: string): string => {
  const karupamLabel = "Karupam";
  const anggotaLabel = "Anggota Rupam";
  const p2uLabel = "Petugas P2U";
  const keteranganLabel = "Keterangan";

  const baseLabels = [karupamLabel, anggotaLabel, p2uLabel, keteranganLabel];
  const maxLabelLength = Math.max(...baseLabels.map(l => l.length)) + 2;

  let detailsContent = "";
  if (!shiftData || !shiftData.rupamId) {
    detailsContent = `Data Rupam tidak dipilih.`;
  } else {
    const rupamDetail = RUPAM_DATA.find(r => r.id === shiftData.rupamId);
    if (!rupamDetail) {
      detailsContent = `Detail Rupam (ID: ${shiftData.rupamId}) tidak ditemukan.`;
    } else {
      detailsContent = `
${padLabel(karupamLabel, maxLabelLength)}: ${rupamDetail.karupam || '-'}
${padLabel(anggotaLabel, maxLabelLength)}:
${formatNumberedList(rupamDetail.anggota)}
${padLabel(p2uLabel, maxLabelLength)}: ${rupamDetail.petugasP2U || '-'}`;
    }
  }

  detailsContent += `\n${padLabel(keteranganLabel, maxLabelLength)}: ${shiftData?.keterangan || '-'}`;
  detailsContent = detailsContent.trimStart();

  return `*RUPAM ${shiftName.toLocaleUpperCase()}*
\`\`\`${detailsContent}\`\`\``;
};

export function generateReportText(data: DailyReportFormInputs): string {
  const reportDate = data.tanggalLaporan;

  const hari = format(reportDate, 'eeee', { locale: id }).toLocaleUpperCase('id-ID');
  const tanggal = format(reportDate, 'd');
  const bulan = format(reportDate, 'MMMM', { locale: id }).toLocaleUpperCase('id-ID');
  const tahun = format(reportDate, 'yyyy');

  let jamLapor: string;
  let menitLapor: string = "00";
  let shiftRangeDescription = "";
  let shiftRupamA = "PAGI";
  let shiftRupamB = "SIANG";


  const { penghuni, petugasPiket, inventaris, kejadianPenting, selectedShiftRange, personilPagi, personilSiang, personilMalam } = data;

  switch (selectedShiftRange) {
    case "PAGI_SIANG":
      jamLapor = "13";
      shiftRupamA = "PAGI";
      shiftRupamB = "SIANG";
      break;
    case "SIANG_MALAM":
      jamLapor = "19";
      shiftRupamA = "SIANG";
      shiftRupamB = "MALAM";
      break;
    case "MALAM_PAGI":
      jamLapor = "07";
      shiftRupamA = "MALAM";
      shiftRupamB = "PAGI";
      break;
    default:
      const fallbackTime = new Date();
      jamLapor = format(fallbackTime, 'HH');
      menitLapor = format(fallbackTime, 'mm');
      shiftRupamA = "TIDAK DIKETAHUI";
      shiftRupamB = "TIDAK DIKETAHUI";
  }
  shiftRangeDescription = `RUPAM ${shiftRupamA} KE RUPAM ${shiftRupamB}`;


  let personilSectionOutputs: string[] = [];
  switch (selectedShiftRange) {
    case "PAGI_SIANG":
      if (personilPagi) personilSectionOutputs.push(generatePersonilShiftText(personilPagi, "Pagi"));
      if (personilSiang) personilSectionOutputs.push(generatePersonilShiftText(personilSiang, "Siang"));
      break;
    case "SIANG_MALAM":
      if (personilSiang) personilSectionOutputs.push(generatePersonilShiftText(personilSiang, "Siang"));
      if (personilMalam) personilSectionOutputs.push(generatePersonilShiftText(personilMalam, "Malam"));
      break;
    case "MALAM_PAGI":
      if (personilMalam) personilSectionOutputs.push(generatePersonilShiftText(personilMalam, "Malam"));
      if (personilPagi) personilSectionOutputs.push(generatePersonilShiftText(personilPagi, "Pagi")); // Removed "(Berikutnya)"
      break;
    default:
      personilSectionOutputs.push("Rentang shift tidak valid.");
  }
  const joinedPersonilOutput = personilSectionOutputs.join('\n\n');


  const totalPenghuni =
    (penghuni.tahananL || 0) +
    (penghuni.tahananP || 0) +
    (penghuni.narapidanaL || 0) +
    (penghuni.narapidanaP || 0);

  const tahananLLabel = "-Tahanan L";
  const tahananPLabel = "-Tahanan P";
  const narapidanaLLabel = "-Narapidana L";
  const narapidanaPLabel = "-Narapidana P";
  const jumlahLabel = "-Jumlah";
  const wbpDalamLabel = "-Jumlah WBP didalam";
  const wbpLuarLabel = "-Jumlah WBP diluar";
  const maxPenghuniLabelLength = Math.max(
    tahananLLabel.length, tahananPLabel.length, narapidanaLLabel.length, narapidanaPLabel.length,
    jumlahLabel.length, wbpDalamLabel.length, wbpLuarLabel.length
  ) + 2;

  const perwiraPiketLabel = "Perwira Piket";
  const dapurLabel = "Dapur";
  const blokWanitaLabel = "Piket Blok Wanita";
  const staffKPRLabel = "Piket Staff KPR";
  const staffSiangLabel = "Piket Staff Siang";
  const maxPiketLabelLength = Math.max(
    perwiraPiketLabel.length, dapurLabel.length, blokWanitaLabel.length, staffKPRLabel.length, staffSiangLabel.length
  ) + 2;

  const senjataLabel = "-Senjata Api P3A";
  const amunisiLabel = "-Amunisi P3A karet";
  const borgolLabel = "-Borgol";
  const metalDetectorLabel = "-Metal Detector";
  const htLabel = "-HT";
  const senterLabel = "-Senter";
  const loncengLabel = "-Lonceng";
  const cctvLabel = "-CCTV";
  const sepatuBootLabel = "-Sepatu Boot";
  const payungLabel = "-Payung";
  const maxInventarisLabelLength = Math.max(
    senjataLabel.length, amunisiLabel.length, borgolLabel.length, metalDetectorLabel.length, htLabel.length,
    senterLabel.length, loncengLabel.length, cctvLabel.length, sepatuBootLabel.length, payungLabel.length
  ) + 2;

  const headerLaporan = `*ASTEKPAM RUTAN KELAS IIB WONOSOBO*
${hari}, ${tanggal} ${bulan} ${tahun} PUKUL ${jamLapor}.${menitLapor} WIB
MOHON IZIN MELAPORKAN ASTEKPAM *${shiftRangeDescription}* BERJALAN AMAN DAN TERTIB, DENGAN RINCIAN SEBAGAI BERIKUT:`;
  
  const bagianPenghuni = `*A. PENGHUNI*
\`\`\`${padLabel(tahananLLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.tahananL)}
${padLabel(tahananPLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.tahananP)}
${padLabel(narapidanaLLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.narapidanaL)}
${padLabel(narapidanaPLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.narapidanaP)}

${padLabel(jumlahLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(totalPenghuni)}
${padLabel(wbpDalamLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.jumlahWBPDidalam)}
${padLabel(wbpLuarLabel, maxPenghuniLabelLength)}: ${formatPenghuniCount(penghuni.jumlahWBPDiluar)}\`\`\``;

  const bagianPersonilPiket = `*PETUGAS PIKET*
\`\`\`${padLabel(perwiraPiketLabel, maxPiketLabelLength)}: ${formatCommaSeparatedList(petugasPiket.perwiraPiket)}
${padLabel(dapurLabel, maxPiketLabelLength)}: ${formatCommaSeparatedList(petugasPiket.dapur)}
${padLabel(blokWanitaLabel, maxPiketLabelLength)}: ${formatCommaSeparatedList(petugasPiket.piketBlokWanita)}
${padLabel(staffKPRLabel, maxPiketLabelLength)}: ${formatCommaSeparatedList(petugasPiket.piketStaffKPR)}
${padLabel(staffSiangLabel, maxPiketLabelLength)}: ${formatCommaSeparatedList(petugasPiket.piketStaffSiang)}\`\`\``;

  const bagianPersonil = `*B. PERSONIL PENGAMANAN*
${joinedPersonilOutput}

${bagianPersonilPiket}`;


  const bagianInventaris = `*C. INVENTARIS REGU PENGAMANAN*
\`\`\`${padLabel(senjataLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.senjataApiP3A)}
${padLabel(amunisiLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.amunisiP3AKaret)}
${padLabel(borgolLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.borgol)}
${padLabel(metalDetectorLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.metalDetector)}
${padLabel(htLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.ht)}
${padLabel(senterLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.senter)}
${padLabel(loncengLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.lonceng)}
${padLabel(cctvLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.cctv)}
${padLabel(sepatuBootLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.sepatuBoot)}
${padLabel(payungLabel, maxInventarisLabelLength)}: ${formatInventarisValue(inventaris.payung)}\`\`\``;
  
  const penutupLaporan = `*DALAM KEADAAN BAIK, SITUASI RUTAN KELAS IIB WONOSOBO DALAM KEADAAN AMAN DAN TERKENDALI. TERIMA KASIH.*`;

  let reportSections = [
    headerLaporan,
    bagianPenghuni,
    bagianPersonil,
    bagianInventaris
  ];

  if (kejadianPenting && kejadianPenting.trim() !== "") {
    const bagianKejadianPenting = `*KEJADIAN PENTING:*
\`\`\`
${kejadianPenting.trim()}
\`\`\``;
    reportSections.push(bagianKejadianPenting);
  }

  reportSections.push(penutupLaporan);

  return reportSections.join('\n\n').trim();
}

