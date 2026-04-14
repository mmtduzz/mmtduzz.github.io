# Bütçe Takip Uygulaması — Gereksinimler

## Genel Bakış

Kişisel kullanım için, yalnızca iPhone'da çalışacak, tarayıcı tabanlı bir bütçe takip uygulaması.
Veriler telefonda (`localStorage`) saklanır; sunucu, hesap veya internet bağlantısı gerekmez.
Tek HTML dosyası olarak çalışır — kurulum, derleme adımı veya bağımlılık yoktur.

---

## Ekranlar ve Gezinme

### Alt Navigasyon Çubuğu (4 sekme)

| Sekme | İkon | Açıklama |
|---|---|---|
| Gider | − | Aylık gider listesi |
| Özet | 🏠 | Gelir/gider özeti ve grafikler |
| Gelir | + | Aylık gelir listesi |
| Ayarlar | ⚙ | Uygulama ayarları |

### Ay Navigasyonu

- Ekranın üstünde her sekmede görünür.
- `← Önceki Ay` | `Mevcut Ay-Yıl` | `Sonraki Ay →` düğmesi.
- Yalnızca seçili aya ait kayıtlar listelenir.

---

## Veri Girişi — Ortak Kurallar

Her gelir veya gider eklenirken **aşağıdaki alanlar her zaman istenir:**

1. **Ad** — serbest metin (örn. "Maaş", "Kira", "NGLS")
2. **Tutar** — sayısal, TRY (₺)
3. **Tarih** — takvim seçici; ayın hangi gününe denk geldiğini belirler
4. **Tekrar Türü** — `Aylık` veya `Tek Seferlik`
5. **Not** — isteğe bağlı kısa not (örn. "5 taksit kaldı", "zam geldi")

---

## Gelir Ekle / Düzenle

### Alanlar

| Alan | Açıklama |
|---|---|
| Gelir Adı | Serbest metin |
| Tutar | TRY ₺ |
| Tarih | Takvim seçici (o ay içindeki gün) |
| Tekrar | Aylık / Tek Seferlik |
| Son Tarih | Yalnızca Aylık seçilirse görünür (toggle + ay-yıl seçici) |
| Başlangıç Tarihi | Yalnızca Aylık seçilirse; tekrarın başladığı ay |
| Not | İsteğe bağlı kısa not |

---

## Gider Ekle / Düzenle

### Alanlar

| Alan | Açıklama |
|---|---|
| Gider Adı | Serbest metin |
| Tutar | TRY ₺ |
| Tarih | Takvim seçici (o ay içindeki gün) |
| Tekrar | Aylık / Tek Seferlik |
| Son Tarih | Yalnızca Aylık seçilirse görünür |
| Başlangıç Tarihi | Yalnızca Aylık seçilirse |
| **Kategori** | Aşağıdaki seçeneklerden biri (gerekli) |
| Not | İsteğe bağlı kısa not |

### Gider Kategorileri

| Kategori | İkon |
|---|---|
| Kredi Kartı | 💳 |
| Fatura | 📄 |
| Kira | 🏠 |
| Market | 🛒 |
| Eğitim | 📚 |
| Sigorta | 🛡️ |
| Ulaşım | 🚗 |
| Sağlık | 💊 |
| Diğer | 📦 |

### Kredi Kartı — Ek Alanlar

Kategori olarak **Kredi Kartı** seçildiğinde ek bölüm açılır:

| Alan | Açıklama |
|---|---|
| Son Ödeme Günü | Ayın hangi günü ödeme yapılacak (1–31) |
| Hatırlatma | Toggle; açıksa son ödeme tarihinden 3 gün önce uygulama açılışında uyarı banner'ı gösterir |

---

## Tekrarlayan Kayıtları Düzenleme

Aylık tekrarlayan bir kayıt düzenlendiğinde, "Kaydet" öncesinde **bir dialog** açılır:

> **"Bu girişi nasıl düzenlemek istiyorsunuz?"**
>
> — `Sadece bu ay` → Yalnızca görüntülenen ay için override oluşturur; geçmiş ve gelecek aylar etkilenmez.
>
> — `Bu tarihten itibaren tümü` → Düzenlemenin yapıldığı aydan itibaren ileriye dönük tüm ayları günceller; geçmiş aylar **değişmez**.
>
> — `İptal`

**Önemli:** Değişiklikler geriye dönük uygulanmaz; yalnızca düzenlemenin yapıldığı tarihten ileri gider.

---

## Tekrarlayan Kayıtları Silme

Aylık tekrarlayan bir kayıt silinirken **üç seçenek sunulur:**

> — `Sadece bu ay` → Yalnızca o ay için gizler.
>
> — `Bu tarihten itibaren sil` → Seçili ay dahil, ileriye dönük tümü silinir.
>
> — `Tümünü sil` → Kaydı tümüyle kaldırır (tüm aylar).
>
> — `İptal`

Tek seferlik kayıtlarda yalnızca `Sil` ve `İptal` gösterilir.

---

## Gelir / Gider Listesi (Ekran Görünümü)

```
┌─────────────────────────────────────────┐
│ Gelecek           161,000₺          ▾  │
│─────────────────────────────────────────│
│ ◉ LEVENT          12,000₺    Paz, 5    │  ← ◉ = ödenmedi / ✓ = ödendi
│ ✓ Bt              20,000₺    Paz, 5    │  ← ödendi, soluklaşır
│ ◉ Gelir           85,000₺    Paz, 5    │
│─────────────────────────────────────────│
│ Ödenen    20,000₺    Kalan    141,000₺  │
└─────────────────────────────────────────┘
```

- Her satır: sol ikon (ödendi/bekliyor), ad, tutar, gün
- **İkon'a dokunmak**: o ay için "ödendi/alındı" işaretini toggle eder
- **Satıra dokunmak**: düzenleme formunu açar
- Ödenen kalemler hafifçe soluklaşır
- Footer: "Ödenen" ve "Kalan" ayrı gösterilir
- Liste ayın gününe göre sıralıdır

---

## Özet Sekmesi

### Aylık Kalan Gelir Grafiği (Yarım Halka)

- Mavi = kalan gelir yüzdesi
- Kırmızı = giderlerin gelire oranı
- Ortada yüzde değeri

### Yıllık Trend Grafiği

- Seçili yıla ait 12 ayın tüm gelir ve giderlerini yan yana çubuk grafik olarak gösterir.
- Ay etiketleri (Oca, Şub … Ara) ve rakamlar.
- Gelir = mavi çubuk, Gider = kırmızı çubuk.
- Bir aya dokunulunca o aya geçer.

### Kategori Bazlı Gider Dağılımı

- Mevcut ay için hangi kategoriye ne kadar harcandığını yatay çubuk grafikle gösterir.
- Bütçe limiti varsa üst sınır çizgisi gösterilir.

---

## Ödendi / Alındı Takibi *(Eklenen Özellik)*

Her liste satırındaki sol ikonuna dokunmak o kalemi o ay için "tamamlandı" olarak işaretler.

- İşaret, o ay için override'da saklanır (`paid: true`).
- Görsel: ödenmemiş = teal boş halka; ödendi = yeşil onay işareti, satır soluklaşır.
- Footer'da "Ödenen" ve "Kalan" ayrı hesaplanır.
- Aylık özette: "Planlanan" vs "Gerçekleşen" farkı görülür.

---

## Kategori Bütçe Limiti *(Eklenen Özellik)*

Her kategori için isteğe bağlı aylık harcama üst sınırı tanımlanabilir.

- Ayarlar sekmesinde her kategori için aylık limit girilebilir.
- Gider listesinde ilgili kategori limitin **%80'ini** geçince turuncu uyarı noktası gösterilir.
- Limiti **aşınca** kırmızı uyarı gösterilir.
- Özet sekmesindeki kategori grafiğinde limit çizgisi görünür.

---

## Karanlık Mod *(Eklenen Özellik)*

- iOS sistem teması (`prefers-color-scheme: dark`) otomatik algılanır.
- Tüm renkler karanlık temaya uyarlanır; ayrı bir toggle gerektirmez.
- Ayarlar'dan manuel geçiş de yapılabilir (Sistem / Açık / Koyu).

---

## Hatırlatma Sistemi

- Kredi kartı gideri için "Hatırlatma" toggle açıksa:
  - Uygulama her açıldığında kontrol edilir.
  - Son ödeme tarihinden **3 gün önce veya günü** ekranda uyarı banner'ı gösterilir.
  - Aynı ay için bir kez gösterilir (tekrar etmez).

---

## PWA — Ana Ekrana Ekle *(Eklenen Özellik)*

iPhone'da Safari üzerinden "Ana Ekrana Ekle" ile tam ekran uygulama gibi çalışır:

- `apple-mobile-web-app-capable` meta etiketi ile Safari araç çubuğu gizlenir.
- `apple-mobile-web-app-status-bar-style: black-translucent` — durum çubuğu şeffaf olur.
- Uygulama ikonu için inline SVG tabanlı `apple-touch-icon` tanımlanır.
- Güvenli alan boşlukları (`env(safe-area-inset-*)`) ile Dynamic Island / çentik / home göstergesi ekrana taşmaz.
- İlk açılışta "Ana Ekrana Ekle" adımlarını anlatan tek seferlik bir banner gösterilir.

---

## Ayarlar Sekmesi

| Seçenek | Açıklama |
|---|---|
| Tema | Sistem / Açık / Koyu |
| Kategori Bütçe Limitleri | Her kategori için aylık üst sınır |
| Veriyi Dışa Aktar | Tüm kayıtları JSON olarak indirir |
| Veriyi İçe Aktar | JSON dosyasından veri yükler |
| Tüm Verileri Sil | localStorage temizler (onay diyalogu) |

---

## Teknik Kısıtlar

- **Tek HTML dosyası** — `butce.html` adıyla repo köküne eklenir.
- Harici kütüphane, CDN, paket yöneticisi **kullanılmaz**.
- Veriler `localStorage` içinde `butce_v1` anahtarıyla JSON olarak saklanır.
- **Yalnızca iPhone / iOS Safari** hedeflidir; `webkit-` prefix'ler ve iOS safe area inset'leri kullanılır.
- Dokunma hedefleri minimum 44×44 px (Apple HIG standardı).
- Tutar maskeleme (👁 butonu): tüm tutarları `•••` ile gizler/gösterir.
- `-webkit-tap-highlight-color: transparent` ile iOS varsayılan dokunma efekti kaldırılır.

---

## Veri Modeli

```json
{
  "id": "benzersiz-id",
  "type": "gelir | gider",
  "name": "Kira",
  "amount": 15000,
  "dayOfMonth": 5,
  "isRecurring": true,
  "startYM": "2026-01",
  "endYM": "2026-12",
  "category": "kira",
  "creditCardDueDay": null,
  "reminderEnabled": false,
  "note": "İsteğe bağlı not",
  "overrides": {
    "2026-04": {
      "amount": 16000,
      "paid": true,
      "deleted": false
    }
  }
}
```

### Override Mantığı

| Alan | Açıklama |
|---|---|
| `deleted: true` | O ay kaydı listeden gizler |
| `paid: true` | O ay için "ödendi/alındı" işareti |
| `amount` | O aya özgü tutar override'ı |
| `dayOfMonth` | O aya özgü gün override'ı |
| `name` | O aya özgü ad override'ı |

"Bu tarihten itibaren" düzenlemesi: eski kaydın `endYM`'i önceki aya set edilir, yeni kayıt `startYM = düzenleme ayı` olarak oluşturulur.

---

## Eklenen Özelliklerin Özeti

| # | Özellik | Gerekçe |
|---|---|---|
| 1 | **PWA / Ana Ekrana Ekle** | iPhone'da tam ekran, native uygulama hissi; çentik/home bar desteği |
| 2 | **Ödendi / Alındı Takibi** | Planlanan vs gerçekleşen ayrımı; ne ödendiğini takip etmek için |
| 3 | **Kategori Bütçe Limiti** | Hangi kategoride ne kadar harcandığını görsel olarak kontrol altında tutmak |
| 4 | **Karanlık Mod** | iOS sistem temasına otomatik uyum; gece kullanım konforu |
| 5 | **Yıllık Trend Grafiği** | 12 aylık gelir/gider örüntüsünü tek bakışta görmek |
| 6 | **Not Alanı** | Her kaleme "5 taksit kaldı", "zam bekleniyor" gibi hatırlatıcı not eklemek |
