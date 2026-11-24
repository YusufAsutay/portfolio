/**
 * Sitedeki kişisel bilgilerin TEK kaynağı.
 * Bir metni ya da bağlantıyı değiştirmek için bileşenlere değil, bu dosyaya dokunman yeterli.
 * "TODO" yazan satırları yayından önce kendi bilgilerinle doldur.
 */

export const profile = {
  name: 'Yusuf Asutay',
  initials: 'YA',

  /** Hero'daki terminal tarzı üst satır */
  tagline: 'yazılım mühendisliği · son sınıf',

  /** Slogan parça parça: highlight=true olan kısım vurgu rengiyle ve kare dalga alt çizgiyle gösterilir */
  slogan: [
    { text: 'Silikondan ekrana, ', highlight: false },
    { text: 'donanımla konuşan', highlight: true },
    { text: ' yazılımlar.', highlight: false },
  ],

  intro:
    "Yazılım mühendisliği son sınıf öğrencisiyim. Güçlü bir yazılım temelinin üzerine donanımı ekliyorum: STM32 üzerinde gömülü C'den C# .NET ile masaüstü telemetri arayüzlerine kadar, donanımla yazılımın buluştuğu katmanlarda kendimi geliştiriyorum.",

  /** Arama motorları ve link önizlemeleri için kısa açıklama (160 karakteri geçmesin) */
  description:
    'Yusuf Asutay — Burdur Mehmet Akif Ersoy Üniversitesi Yazılım Mühendisliği öğrencisi. Gömülü sistemler, STM32, CAN-Bus ve C# .NET projeleri.',

  education: {
    university: 'Burdur Mehmet Akif Ersoy Üniversitesi',
    department: 'Yazılım Mühendisliği',
    year: 4, // kaçıncı sınıf
    graduation: 2027, // mezuniyet yılı
  },

  /** true iken hero'da "Yeni fırsatlara açık" rozeti görünür */
  available: true,

  links: {
    github: 'https://github.com/YusufAsutay',
    linkedin: 'https://www.linkedin.com/in/yusufasutay/',
    email: 'yusufasutay12@gmail.com',
  },

  /**
   * İletişim formu.
   * Boş bırakırsan "Gönder", ziyaretçinin e-posta uygulamasını mesaj hazır yazılmış hâlde açar.
   * İleride Formspree gibi bir form servisinden aldığın adresi yazarsan
   * (ör. 'https://formspree.io/f/abcd1234') mesajlar sayfadan ayrılmadan doğrudan e-postana gelir.
   */
  contact: {
    formEndpoint: '',
  },
} as const;

/**
 * Hakkımda bölümünün metinleri. Kendi ağzından, doğru ve güncel olmalı:
 * mülakatta her cümlesi sorulabilir. Değiştirmek istediğin yeri burada düzelt.
 */
export const about = {
  title: 'Ekrandaki koddan, masadaki karta.',
  paragraphs: [
    "Burdur Mehmet Akif Ersoy Üniversitesi'nde Yazılım Mühendisliği 4. sınıf öğrencisiyim; 2027'de mezun olacağım. Yazılım temelimi C, C# ve Python üzerine kurdum: .NET ile masaüstü ve telemetri arayüzleri geliştirdim, Python ile veri işleme ve makine öğrenmesi üzerine çalıştım.",
    'Beni en çok heyecanlandıran şey, yazdığım kodun ekranda kalmayıp gerçek dünyada bir şeyi ölçmesi, sürmesi ve haberleşmesi. Bu yüzden yazılım bilgimin yanına donanımı da koyuyorum: STM32 ve ESP32 gibi mikrodenetleyici kartlarla devre kurmayı, register seviyesinde programlamayı ve CAN-Bus, UART gibi protokolleri uygulayarak öğreniyorum.',
    'Bitirme projem bu iki dünyanın buluştuğu yer: CAN-Bus Tabanlı Elektrikli Araç Batarya Yönetim Sistemi (BMS) ve Şarj İstasyonu Simülatörü. Hücre gerilimi, sıcaklık ve şarj durumu verilerini işleyen bu sistem, şarj istasyonuyla CAN-Bus ve Modbus TCP/IP üzerinden haberleşiyor ve bir C# SCADA arayüzünden izleniyor. Sıradaki adımım, bu mimariyi STM32 kartlarla gerçek donanım üzerinde çalıştırmak.',
  ],
  focus: 'Gömülü sistemler · Mikrodenetleyiciler',
  /** Bitirme projesinin tam adı: veri sayfası, hero monitörü ve proje kartı buradan okur */
  capstone: 'CAN-Bus Tabanlı Elektrikli Araç Batarya Yönetim Sistemi (BMS) ve Şarj İstasyonu Simülatörü',
  goals: [
    {
      title: 'Donanıma en yakın katmanda ustalaşmak',
      text: 'Mikrodenetleyicilerde register, kesme ve zamanlayıcılarla çalışarak donanımın nasıl düşündüğünü derinlemesine anlamak.',
    },
    {
      title: 'Güvenilir haberleşme kurmak',
      text: 'CAN-Bus, Modbus ve UART gibi endüstriyel protokollerde sahada güvenle çalışan sistemler geliştirmek.',
    },
    {
      title: 'Donanımı test eden yazılımlar',
      text: 'HIL test düzenekleri ve telemetri arayüzleriyle yazılım ve donanım dünyasını tek bir projede buluşturmak.',
    },
  ],
} as const;

/**
 * Menü öğeleri. "id", sayfadaki bölümün id'siyle aynı olmalı (#hakkimda gibi).
 * "designator": devre kartındaki parça etiketi (U = entegre, J = konnektör).
 * Hero'daki çip U1; iletişim bir "konnektör" olduğu için J1.
 */
export const navItems = [
  { id: 'hakkimda', label: 'Hakkımda', designator: 'U2' },
  { id: 'yetenekler', label: 'Yetenekler', designator: 'U3' },
  { id: 'projeler', label: 'Projeler', designator: 'U4' },
  { id: 'deneyim', label: 'Deneyim', designator: 'U5' },
  { id: 'iletisim', label: 'İletişim', designator: 'J1' },
] as const;
