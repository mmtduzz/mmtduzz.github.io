# Bütçe Takip Uygulaması — Gereksinimler

## Genel Bakış

Kişisel kullanım için, yalnızca tek bir telefonda çalışacak, tarayıcı tabanlı bir bütçe takip uygulaması.
Veriler telefonda (localStorage) saklanır; sunucu, hesap veya internet bağlantısı gerekmez.
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
4. **Tekrar Türü** — `Aylık` veya `Tek Seferlik` (toggle/seçim)

---

## Gelir Ekle / Düzenle

### Alanlar

| Alan | Açıklama |
|---|---|
| Gelir Adı | Serbest metin |
| Tutar | TRY ₺ |
| Tarih | Takvim seçici (o ay içindeki gün) |
| Tekrar | Aylık / Tek Seferlik |
| Son Ödeme Tarihi | Yalnızca Aylık seçilirse görünür (toggle + ay-yıl seçici) |
| Başlangıç Tarihi | Yalnızca Aylık seçilirse; tekrarın başladığı ay |

---

## Gider Ekle / Düzenle

### Alanlar

| Alan | Açıklama |
|---|---|
| Gider Adı | Serbest metin |
| Tutar | TRY ₺ |
| Tarih | Takvim seçici (o ay içindeki gün) |
| Tekrar | Aylık / Tek Seferlik |
| Son Ödeme Tarihi | Yalnızca Aylık seçilirse görünür |
| Başlangıç Tarihi | Yalnızca Aylık seçilirse |
| **Kategori** | Aşağıdaki seçeneklerden biri (gerekli) |

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
| Hatırlatma | Toggle; açıksa son ödeme tarihinden 3 gün önce uygulama başlatıldığında uyarı gösterir |

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

## Gelir Sekmesi (Ekran Görünümü)

```
┌─────────────────────────────────────────┐
│ Gelecek           161,000₺          ▾  │
│─────────────────────────────────────────│
│ ◉ LEVENT          12,000₺    Paz, 5    │
│ ◉ Bt              20,000₺    Paz, 5    │
│ ◉ Gelir           85,000₺    Paz, 5    │
│ ◉ Tuğçe           14,000₺    Sal, 7    │
│ ◉ ES              30,000₺    Sal, 7    │
│─────────────────────────────────────────│
│ Toplam Gelir       Kalan Gelir          │
│ 161,000₺           161,000₺            │
└─────────────────────────────────────────┘
```

- Her satır: ad, tutar, haftanın günü + ayın günü
- Satıra tıklayınca düzenleme formu açılır
- Liste ayın gününe göre sıralıdır

---

## Gider Sekmesi (Ekran Görünümü)

Gelir sekmesiyle aynı yapı; gider kalemleri listelenir.

---

## Özet Sekmesi

### Kalan Gelir Yüzdesi (Yarım Halka Grafik)

```
Gelir     161,000₺   [●●●●●●●●○○]  %55
Gider      73,107₺
─────────────────
Kalan      87,893₺
```

- Mavi = kalan gelir yüzdesi
- Kırmızı = giderlerin gelire oranı
- Grafiğin ortasında yüzde değeri

---

## Hatırlatma Sistemi

- Kredi kartı gideri için "Hatırlatma" toggle açıksa:
  - Uygulama her açıldığında kontrol edilir.
  - Son ödeme tarihinden **3 gün önce veya günü** ekranda uyarı banner'ı gösterilir.
  - Aynı ay için bir kez gösterilir (tekrar etmez).

---

## Ayarlar Sekmesi

| Seçenek | Açıklama |
|---|---|
| Veriyi Dışa Aktar | Tüm kayıtları JSON olarak indirir |
| Veriyi İçe Aktar | JSON dosyasından veri yükler |
| Tüm Verileri Sil | LocalStorage'ı temizler (onay ister) |

---

## Teknik Kısıtlar

- **Tek HTML dosyası** — `butce.html` adıyla repo köküne eklenir.
- Harici kütüphane, CDN, paket yöneticisi **kullanılmaz**.
- Veriler `localStorage` içinde `butce_entries` anahtarıyla JSON olarak saklanır.
- iOS Safari ve Android Chrome ile uyumlu olmalı.
- Mobil öncelikli tasarım: dokunma hedefleri en az 44×44 px.
- Tutar maskeleme (👁 butonu): tüm tutarları `•••` ile gizler/gösterir.

---

## Veri Modeli (Özet)

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
  "overrides": {
    "2026-04": { "amount": 16000 },
    "2026-05": { "deleted": true }
  }
}
```

### Override Mantığı

- `overrides["YYYY-MM"]` o aya özgü değişiklikleri tutar.
- `deleted: true` → o ay kaydı göstermez.
- `amount`, `dayOfMonth`, `name` → o ay için geçerli değeri override eder.
- "Bu tarihten itibaren" düzenlemesi: eski kaydın `endYM`'i önceki aya set edilir, yeni kayıt `startYM = düzenleme ayı` olarak oluşturulur.
