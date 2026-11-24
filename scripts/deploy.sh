#!/usr/bin/env bash
# =====================================================================
# yusufasty.com.tr — sunucuda güncelleme betiği
#
# Kullanım (sunucuda, Termius'ta):
#   bash ~/portfolio/scripts/deploy.sh
#
# Site sunucuda DERLENMEZ. Derlemeyi GitHub Actions yapar
# (.github/workflows/yayin.yml) ve hazır dosyaları "yayin" dalına koyar.
# Sebep: sunucunun sanal işlemcisi, derleme araçlarının kullandığı bazı
# işlemci komutlarını desteklemiyor ("Illegal instruction" hatası).
#
# Ne yapar?
#   1) main dalını günceller (betiklerin en yeni hâli için)    (git pull)
#   2) "yayin" dalındaki hazır siteyi geçici bir klasöre çıkarır (git fetch + git archive)
#   3) Geçici klasörü Apache'nin yayın klasörüne kopyalar       (rsync)
#
# Yayın klasörü: Apache ayarındaki DocumentRoot (sites-enabled/yusufasty.com.tr*.conf).
# Farklı bir klasöre yayınlamak gerekirse şöyle çalıştır:
#   WEB_ROOT=/var/www/baska-klasor bash ~/portfolio/scripts/deploy.sh
# =====================================================================

# Güvenlik kemeri: bir komut hata verirse (-e), tanımsız değişken kullanılırsa (-u)
# ya da bir boru hattının (|) herhangi bir parçası çökerse (pipefail) betik hemen durur.
# Böylece yarım kalmış bir iş asla yayın klasörüne kopyalanmaz.
set -euo pipefail

# Deponun kök klasörü: bu betiğin bulunduğu klasörün bir üstü
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/yusufasty.com.tr/html}"
BRANCH="yayin"

# Geçici klasör: betik nasıl biterse bitsin (başarı ya da hata) sonunda silinir.
# mktemp klasörü yalnızca sahibine açık (700) oluşturur; Apache okuyabilsin diye 755 yapıyoruz.
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
chmod 755 "$STAGE"

cd "$REPO_DIR"

echo "▶ 1/3  main dalı güncelleniyor…"
git pull --ff-only

echo "▶ 2/3  Hazır site indiriliyor ($BRANCH dalı)…"
git fetch origin "$BRANCH"
git archive "origin/$BRANCH" | tar -x -C "$STAGE"
echo "       Derleme: $(git log -1 --format='%s (%cr)' "origin/$BRANCH")"

# Emniyet kontrolü: indirilen pakette ana sayfa yoksa yayın klasörüne hiç dokunma
if [ ! -f "$STAGE/index.html" ]; then
  echo "✗ Hazır sitede index.html bulunamadı; yayın iptal edildi." >&2
  exit 1
fi

echo "▶ 3/3  Yayın klasörü güncelleniyor: $WEB_ROOT"
# -a        : dosya izinlerini ve tarihlerini koru
# --chmod   : klasörler 755, dosyalar 644 olsun (Apache her şeyi okuyabilsin)
# --delete  : yeni sitede olmayan eski dosyaları yayın klasöründen sil (tam kopya)
# --exclude : Let's Encrypt'in sertifika yenilerken kullandığı klasöre dokunma
sudo rsync -a --chmod=D755,F644 --delete --exclude '.well-known/' "$STAGE/" "$WEB_ROOT/"

echo "✓ Tamamlandı → https://yusufasty.com.tr  (tarayıcıda Ctrl+F5 ile yenile)"
