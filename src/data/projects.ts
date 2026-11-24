import type { GroupId } from './skills';
import { about } from './profile';

/**
 * Projeler. Kartlar bu listeden, buradaki sırayla üretilir.
 *
 * domain   → kartın rengi; yetenek gruplarıyla aynı (mcu, bus, app, sys)
 * status   → 'ongoing' ise kartta yeşil LED ile "Devam ediyor" yazar
 * metric   → (isteğe bağlı) öne çıkan bir sayı, ör. yarışma skoru
 * links    → kaynak kodu (repo) ya da canlı adres (demo) varsa ekle; yoksa düğme görünmez
 * featured → tam genişlikte, sistem şemasıyla gösterilen öne çıkan proje
 * diagram  → (isteğe bağlı) kartın yanında çizilen veri akışı şeması
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  context: string;
  status: 'done' | 'ongoing';
  domain: GroupId;
  highlights: string[];
  tech: string[];
  metric?: { value: string; label: string };
  links?: { repo?: string; demo?: string };
  here?: boolean; // "şu an buradasın" rozeti (bu sitenin kendisi)
  featured?: boolean;
  diagram?: {
    nodes: { title: string; detail: string }[];
    links: string[]; // düğümler arasındaki protokoller (nodes.length - 1 tane)
  };
}

export const projects: Project[] = [
  {
    id: 'bms',
    title: about.capstone, // tam ad profile.ts'te
    subtitle: 'Batarya verilerini simüle eden, şarj istasyonuyla haberleşen ve C# SCADA arayüzüyle izlenen bütünleşik mimari',
    role: 'Sistem mimarı ve geliştirici',
    context: 'Lisans bitirme projesi',
    status: 'ongoing',
    domain: 'mcu',
    featured: true,
    highlights: [
      'Batarya paketlerinin hücre gerilimi, sıcaklık ve şarj durumu (SoC) verilerini simüle eden ve şarj istasyonuyla haberleşen bütünleşik bir yazılım mimarisi geliştiriyorum.',
      'Gömülü katman simülasyonu için CAN-Bus, istasyon–sunucu iletişimi için Modbus TCP/IP protokollerini entegre ederek verileri özel bir C# SCADA arayüzünde izlenebilir hâle getirdim.',
    ],
    tech: ['C#', 'Gömülü C', 'CAN-Bus', 'Modbus TCP/IP', 'SCADA arayüz tasarımı'],
    diagram: {
      nodes: [
        { title: 'BMS', detail: 'gömülü katman · hücre V, T, SoC' },
        { title: 'Şarj istasyonu', detail: 'istasyon simülatörü' },
        { title: 'SCADA', detail: 'C# arayüz · canlı izleme' },
      ],
      links: ['CAN-Bus', 'Modbus TCP/IP'],
    },
  },
  {
    id: 'modbus-studio',
    title: 'ModbusStudio',
    subtitle: 'Endüstriyel Modbus Master/Slave simülatörü',
    role: 'Full-stack masaüstü yazılım geliştirici',
    context: 'Staj projesi',
    status: 'done',
    domain: 'bus',
    highlights: [
      'Endüstriyel otomasyon ve gömülü sistem testlerinde kullanılmak üzere Modbus TCP ve Modbus RTU protokollerini Master ve Slave modlarında simüle edebilen bir masaüstü uygulaması geliştirdim.',
      'Register okuma/yazma işlemlerini (Coils, Discrete Inputs, Holding/Input Registers) gerçek zamanlı takip eden dinamik bir kullanıcı arayüzü tasarladım.',
    ],
    tech: ['C#', '.NET MAUI Blazor Hybrid', 'Razor Components', 'Modbus TCP/RTU', 'HTML/CSS'],
  },
  {
    id: 'serial-debug-studio',
    title: 'Serial Debug Studio',
    subtitle: 'Çok protokollü haberleşme ve analiz aracı',
    role: 'Yazılım geliştirici',
    context: 'Staj projesi',
    status: 'done',
    domain: 'bus',
    highlights: [
      'Gömülü sistemlerin hata ayıklama süreçlerini hızlandırmak için seri port (UART) ve TCP/UDP ağ bağlantılarını tek arayüzde birleştiren bir test aracı geliştirdim.',
      'Özel komut makroları, HEX/ASCII format dönüşümleri ve gelen veri paketlerini canlı dalga formu grafiğinde görselleştirme özellikleri ekledim.',
    ],
    tech: ['C#', '.NET MAUI Blazor Hybrid', 'System.IO.Ports', 'TCP/UDP soketleri', 'Gerçek zamanlı görselleştirme'],
  },
  {
    id: 'kaggle-ensemble',
    title: 'Kaggle Topluluk (Ensemble) Modeli',
    subtitle: 'LightGBM ve sıra harmanlama ile çok modelli tahmin hattı',
    role: 'Veri bilimi ve model geliştirici',
    context: 'Kaggle yarışması',
    status: 'done',
    domain: 'sys',
    highlights: [
      'Yüksek boyutlu veri setleri üzerinde özellik mühendisliği ve hiperparametre optimizasyonu uygulayarak çok modelli bir tahmin hattı kurdum.',
      'LightGBM tabanlı modelleri sıra harmanlama (rank blending) tekniğiyle birleştirerek yarışma değerlendirmesinde 0.89007 genel skor elde ettim.',
    ],
    tech: ['Python', 'LightGBM', 'Scikit-learn', 'Pandas', 'NumPy'],
    metric: { value: '0.89007', label: 'yarışma skoru' },
  },
  {
    id: 'ustam-oto-makas',
    title: 'Ustam Oto Makas',
    subtitle: 'Kurumsal web sitesi ve marka kimliği',
    role: 'Full-stack web geliştirici ve tasarımcı',
    context: 'İşletme projesi',
    status: 'done',
    domain: 'app',
    highlights: [
      'Yerel bir otomotiv servis işletmesi için modern, mobil uyumlu kurumsal web sitesini ve dijital/basılı tanıtım materyallerini sıfırdan hazırladım.',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Duyarlı tasarım', 'Grafik tasarım'],
  },
  {
    id: 'portfolio',
    title: 'yusufasty.com.tr',
    subtitle: 'Kişisel portfolyo ve Linux sunucu altyapısı',
    role: 'Sistem yöneticisi ve geliştirici',
    context: 'Kişisel proje',
    status: 'done',
    domain: 'sys',
    here: true,
    highlights: [
      "Ubuntu tabanlı bir sanal özel sunucuda (VPS) Apache2 kurulumu, DNS yönlendirmeleri ve Let's Encrypt SSL sertifika otomasyonunu yapılandırarak kişisel sitemi yayına aldım.",
      'Şu an gezdiğin yeni sürümü Astro ile sıfırdan tasarlıyorum: iki tema, erişilebilirlik ve hız odaklı.',
    ],
    tech: ['Linux (Ubuntu)', 'Apache2', 'DNS yönetimi', "Let's Encrypt", 'Astro', 'TypeScript'],
  },
];
