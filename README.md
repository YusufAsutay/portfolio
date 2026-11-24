# yusufasty.com.tr

Gömülü sistemler ve yazılım geliştirme odaklı kişisel portfolyo sitesi.
[Astro](https://astro.build) ile geliştirilmiş, tamamen statik bir site: derleme çıktısı
(`dist/`) saf HTML, CSS ve az miktarda JavaScript'ten oluşur; sitenin çalışması için
sunucuda Node.js gerekmez (yalnızca derleme sırasında kullanılır).

## Komutlar

Hepsi proje klasöründe (`C:\dev\portfolio`) çalıştırılır:

| Komut             | Ne yapar                                                  |
| :---------------- | :-------------------------------------------------------- |
| `npm install`     | Bağımlılıkları kurar (`node_modules/`)                    |
| `npm run dev`     | Geliştirme sunucusunu başlatır → http://localhost:4321    |
| `npm run build`   | Yayına hazır siteyi `dist/` klasörüne üretir              |
| `npm run preview` | `dist/` çıktısını yerelde, yayındaki haliyle önizler      |

## Klasör yapısı

```text
src/
├── data/                → sitedeki bütün içerik (metinler buradan değişir)
│   ├── profile.ts       → kişisel bilgiler, bağlantılar, Hakkımda metni, menü
│   ├── skills.ts        → yetenekler (çipin bacakları)
│   ├── projects.ts      → proje kartları
│   ├── experience.ts    → deneyim zaman çizelgesi
│   └── can.ts           → hero'daki CAN-Bus monitörünün sinyalleri
├── styles/
│   ├── tokens.css       → iki tema (Bakır & Grafit / Datasheet), font ve boşluk değişkenleri
│   └── global.css       → sıfırlama, temel tipografi, butonlar, animasyonlar
├── layouts/
│   └── BaseLayout.astro → <head>, meta etiketleri, menü ve footer iskeleti
├── components/          → sayfa bölümleri (Hero, About, Skills, Projects, Experience, Contact …)
├── utils/text.ts        → küçük metin yardımcıları
└── pages/index.astro    → ana sayfa: bölümleri sırayla dizer
public/                  → olduğu gibi kopyalanan dosyalar (favicon, robots.txt, sitemap.xml)
scripts/deploy.sh        → sunucuda güncelleme betiği
```

## Yayına alma

Akış: **bilgisayar → GitHub (derleme) → sunucu**.

1. Bilgisayarda değişikliği GitHub'a gönder:
   `git add -A` → `git commit -m "açıklama"` → `git push`
2. GitHub Actions ([yayin.yml](.github/workflows/yayin.yml)) siteyi derler ve hazır
   dosyaları `yayin` dalına koyar (1–2 dakika; deponun **Actions** sekmesinden izlenir).
3. Sunucuda (Termius) tek komut:
   `bash ~/portfolio/scripts/deploy.sh`

Betik `yayin` dalındaki hazır siteyi indirir ve Apache'nin yayın klasörüne
(`/var/www/yusufasty.com.tr/html`) kopyalar. Site sunucuda derlenmez: sunucunun sanal
işlemcisi, derleme araçlarının kullandığı bazı işlemci komutlarını desteklemiyor
("Illegal instruction" hatası). Bu yüzden sunucuda Node.js'e gerek yoktur.
