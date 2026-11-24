import type { GroupId } from './skills';
import { about, profile } from './profile';

/**
 * Deneyim zaman çizelgesi: en yeni adım en üstte.
 * İleride staj, sertifika ya da yarışma eklemek için listeye yeni bir nesne eklemen yeterli.
 */
export interface Entry {
  role: string; // unvan ya da başlık
  org: string; // kurum ya da proje adı
  when: string; // zaman bilgisi
  summary: string; // tek paragraflık açıklama
  tags: string[]; // kullanılan teknolojiler
  domain: GroupId; // düğüm rengi (yetenek gruplarıyla aynı)
  head?: boolean; // en güncel adım: "HEAD → main" etiketi taşır
}

const { education } = profile;

export const experience: Entry[] = [
  {
    role: 'Lisans bitirme projesi',
    org: about.capstone,
    when: 'Şu an · devam ediyor',
    summary:
      'Batarya verilerini simüle eden, şarj istasyonuyla CAN-Bus ve Modbus TCP/IP üzerinden haberleşen ve C# SCADA arayüzüyle izlenen bütünleşik bir mimari geliştiriyorum.',
    tags: ['C#', 'Gömülü C', 'CAN-Bus', 'Modbus TCP/IP', 'SCADA'],
    domain: 'mcu',
    head: true,
  },
  {
    role: 'Yazılım geliştirme stajyeri',
    org: 'Nero Endüstri Savunma Sanayi A.Ş.',
    when: 'Staj · 2 ay',
    summary:
      'Endüstriyel haberleşme ve gömülü sistem testleri için iki masaüstü aracı geliştirdim: Modbus TCP/RTU protokolünü Master ve Slave modlarında simüle eden ModbusStudio ile seri port (UART) ve TCP/UDP bağlantılarını tek arayüzde birleştiren Serial Debug Studio.',
    tags: ['C#', '.NET MAUI Blazor Hybrid', 'Modbus TCP/RTU', 'UART', 'TCP/UDP'],
    domain: 'bus',
  },
  {
    role: `${education.department} (lisans)`,
    org: education.university,
    when: `Mezuniyet ${education.graduation}`,
    summary: `${education.year}. sınıf öğrencisiyim. Güçlü bir yazılım temelinin üzerine gömülü sistemler ve mikrodenetleyiciler alanında kendimi geliştiriyorum.`,
    tags: [],
    domain: 'sys',
  },
];
