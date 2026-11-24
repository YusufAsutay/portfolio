/**
 * Hero'daki "CAN-Bus monitörü" için temsili BMS sinyalleri.
 *
 * Ekrandaki hex baytlar, yanlarındaki fiziksel değeri gerçekten kodlar:
 *   ham değer = fiziksel değer / ölçek  →  16 bit, büyük endian (önce yüksek bayt)
 *   Örnek: 3.871 V / 0.001 = 3871 = 0x0F1F  →  "0F 1F"
 * Gömülü sistem bilen biri baktığında tutarlı görsün diye.
 */

export interface Signal {
  id: number; // 11 bitlik CAN kimliği
  label: string; // ekranda görünen ad
  unit: string; // birim
  scale: number; // 1 bitin fiziksel karşılığı (çözünürlük)
  decimals: number; // gösterilecek ondalık basamak
  min: number; // değerin gezineceği alt sınır
  max: number; // üst sınır
  step: number; // her güncellemedeki en büyük değişim
  value: number; // başlangıç değeri
  prefix?: number[]; // veriden önce gönderilen baytlar (ör. hücre numarası)
}

export const signals: Signal[] = [
  { id: 0x100, label: 'Paket', unit: 'V', scale: 0.01, decimals: 2, min: 47.6, max: 49.2, step: 0.05, value: 48.21 },
  { id: 0x101, label: 'Akım', unit: 'A', scale: 0.1, decimals: 1, min: -18, max: 6, step: 0.8, value: -12.4 },
  { id: 0x110, label: 'Hücre 03', unit: 'V', scale: 0.001, decimals: 3, min: 3.82, max: 3.92, step: 0.004, value: 3.871, prefix: [0x03] },
  { id: 0x120, label: 'Sıcaklık', unit: '°C', scale: 0.1, decimals: 1, min: 24, max: 31, step: 0.3, value: 27.4 },
  { id: 0x130, label: 'SoC', unit: '%', scale: 0.1, decimals: 1, min: 78, max: 86, step: 0.1, value: 82.6 },
];

/** Fiziksel değeri CAN veri baytlarına çevirir → ["03", "0F", "1F"] */
export function encode(signal: Signal, value: number): string[] {
  let raw = Math.round(value / signal.scale);
  if (raw < 0) raw += 0x10000; // negatif sayılar: 16 bit ikiye tümleyen gösterimi
  const bytes = [...(signal.prefix ?? []), (raw >> 8) & 0xff, raw & 0xff];
  return bytes.map((b) => b.toString(16).toUpperCase().padStart(2, '0'));
}

/** 0x110 gibi, üç haneli onaltılık CAN kimliği */
export const formatId = (id: number) => '0x' + id.toString(16).toUpperCase().padStart(3, '0');

/** "3.871 V" gibi */
export const formatValue = (signal: Signal, value: number) => `${value.toFixed(signal.decimals)} ${signal.unit}`;

/**
 * Değeri küçük rastgele adımlarla sınırlar içinde gezdirir (rastgele yürüyüş),
 * sonra çözünürlüğe yuvarlar: böylece gösterilen sayı ile hex baytlar hep birebir tutar.
 */
export function drift(signal: Signal): number {
  const next = signal.value + (Math.random() * 2 - 1) * signal.step;
  const clamped = Math.min(signal.max, Math.max(signal.min, next));
  signal.value = Math.round(clamped / signal.scale) * signal.scale;
  return signal.value;
}
