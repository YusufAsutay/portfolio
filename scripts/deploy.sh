#!/usr/bin/env bash
# =====================================================================
# yusufasty.com.tr — sunucuda güncelleme betiği
#
# Kullanım (sunucuda, Termius'ta):
#   bash ~/portfolio/scripts/deploy.sh
#
# Ne yapar?
#   1) GitHub'daki en son sürümü çeker        (git pull)
#   2) Bağımlılıkları kurar                    (npm ci)
#   3) Siteyi derler → dist/ klasörü oluşur    (npm run build)
#   4) dist/ içeriğini Apache'nin yayınladığı klasöre kopyalar (rsync)
#
# Yayın klasörü: Apache ayarındaki DocumentRoot (sites-enabled/yusufasty.com.tr*.conf).
# Farklı bir klasöre yayınlamak gerekirse şöyle çalıştır:
#   WEB_ROOT=/var/www/baska-klasor bash ~/portfolio/scripts/deploy.sh
# =====================================================================

# Güvenlik kemeri: bir komut hata verirse (-e), tanımsız değişken kullanılırsa (-u)
# ya da bir boru hattının (|) herhangi bir parçası çökerse (pipefail) betik hemen durur.
# Böylece yarım kalmış bir derleme asla yayına kopyalanmaz.
set -euo pipefail

# Deponun kök klasörü: bu betiğin bulunduğu klasörün bir üstü
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/yusufasty.com.tr/html}"

cd "$REPO_DIR"

echo "▶ 1/4  GitHub'dan en son sürüm çekiliyor…"
git pull --ff-only

echo "▶ 2/4  Bağımlılıklar kuruluyor (npm ci)…"
npm ci --no-audit --no-fund

echo "▶ 3/4  Site derleniyor (npm run build)…"
npm run build

echo "▶ 4/4  Yayın klasörü güncelleniyor: $WEB_ROOT"
# -a        : dosya izinlerini ve tarihlerini koru
# --delete  : dist/'te artık olmayan eski dosyaları yayın klasöründen sil (tam kopya)
# --exclude : Let's Encrypt'in sertifika yenilerken kullandığı klasöre dokunma
sudo rsync -a --delete --exclude '.well-known/' "$REPO_DIR/dist/" "$WEB_ROOT/"

echo "✓ Tamamlandı → https://yusufasty.com.tr  (tarayıcıda Ctrl+F5 ile yenile)"
