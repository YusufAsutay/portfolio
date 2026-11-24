/**
 * Yetenekler.
 * side: 'hw' = donanım tarafı (çipin sol bacakları), 'sw' = yazılım tarafı (sağ bacaklar).
 * active: true → adının yanında yeşil LED yanar: "bitirme projemde şu an kullanıyorum".
 * Listedeki sıra, çipteki bacak sırasıdır. Ekle, çıkar, sırala: diyagram kendini günceller.
 */

export const groups = [
  { id: 'mcu', label: 'Gömülü & Mikrodenetleyici', side: 'hw' },
  { id: 'bus', label: 'Haberleşme', side: 'hw' },
  { id: 'app', label: 'Masaüstü & Arayüz', side: 'sw' },
  { id: 'sys', label: 'Sistem & Veri', side: 'sw' },
] as const;

export type GroupId = (typeof groups)[number]['id'];

export interface Skill {
  name: string;
  group: GroupId;
  active?: boolean;
}

export const skills: Skill[] = [
  // ---- Donanım tarafı (sol bacaklar 1 → 10) ----
  { name: 'C / C++', group: 'mcu', active: true },
  { name: 'STM32', group: 'mcu', active: true },
  { name: 'ARM Cortex-M', group: 'mcu' },
  { name: 'Register / HAL', group: 'mcu' },
  { name: 'CAN-Bus', group: 'bus', active: true },
  { name: 'Modbus TCP · RTU', group: 'bus', active: true },
  { name: 'TCP / UDP', group: 'bus' },
  { name: 'UART / USART', group: 'bus' },
  { name: 'RS-485', group: 'bus' },
  { name: 'MIL-STD', group: 'bus' },

  // ---- Yazılım tarafı (sağ bacaklar 20 → 11) ----
  { name: 'C#', group: 'app', active: true },
  { name: '.NET MAUI', group: 'app' },
  { name: 'Blazor Hybrid', group: 'app' },
  { name: 'SCADA arayüzleri', group: 'app', active: true },
  { name: 'HTML / CSS', group: 'app' },
  { name: 'TypeScript · Astro', group: 'app' },
  { name: 'Python', group: 'sys' },
  { name: 'Makine öğrenmesi', group: 'sys' },
  { name: 'Linux · Bash', group: 'sys' },
  { name: 'Git', group: 'sys' },
];
