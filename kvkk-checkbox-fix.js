/**
 * KVKK / Aydınlatma Metni onay kutusu hizalama düzeltmesi
 * Hedef sayfa: /tr/kurumsal/bize-ulasin (iletişim formu)
 *
 * Sorun: Desktop görünümünde KVKK ve Aydınlatma Metni kutucukları kayık /
 * bozuk görünüyor. En sık nedeni: formun genel input stillerinin
 * (width:100%, display:block, height, float vb.) checkbox'lara da uygulanması
 * ve etiketin alt satıra düşmesi.
 *
 * Kullanım: Site yönetim panelindeki kod/script bölümüne şu şekilde ekleyin:
 *   <script src=".../kvkk-checkbox-fix.js"></script>
 * veya dosya içeriğini <script> ... </script> arasına yapıştırın.
 *
 * Doğrulama: Sayfayı açıp F12 > Console'a bakın. Betik çalıştıysa
 * "[kvkk-fix]" ile başlayan bir mesaj görürsünüz (kaç kutunun düzeltildiği yazar).
 */
(function () {
  'use strict';

  // Sorun desktop'ta görüldüğü için mobil düzene dokunmuyoruz.
  var MIN_DESKTOP_WIDTH = 992;

  // Onay satırlarını metinden tanımak için anahtar kelimeler
  // (Türkçe karakterler normalize edildikten sonra aranır)
  var KEYWORDS = [
    'kvkk',
    'aydinlatma',       // aydınlatma metni
    'kisisel veri',     // kişisel verilerin korunması
    'acik riza',        // açık rıza
    'onay metni',
    'gizlilik'
  ];

  function norm(s) {
    return String(s || '')
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');
  }

  function isConsentText(text) {
    var t = norm(text);
    if (!t) return false;
    for (var i = 0; i < KEYWORDS.length; i++) {
      if (t.indexOf(KEYWORDS[i]) !== -1) return true;
    }
    return false;
  }

  // Checkbox'a ait etiketi bul: label[for], kapsayan label veya hemen yanındaki eleman
  function findLabel(input) {
    var lbl;
    if (input.id) {
      try {
        lbl = document.querySelector('label[for="' + input.id.replace(/"/g, '\\"') + '"]');
        if (lbl) return lbl;
      } catch (e) { /* geçersiz id ise yoksay */ }
    }
    if (input.closest) {
      lbl = input.closest('label');
      if (lbl) return lbl;
    }
    var next = input.nextElementSibling;
    if (next && /^(LABEL|SPAN|A|P|DIV)$/.test(next.tagName)) return next;
    return null;
  }

  function rowTextFor(input) {
    var lbl = findLabel(input);
    if (lbl && lbl.textContent && lbl.textContent.trim()) return lbl.textContent;
    return input.parentElement ? input.parentElement.textContent : '';
  }

  // Site özel (span ile çizilen) checkbox kullanıyorsa gerçek input gizlidir;
  // o durumda input'un kendisine dokunmayıp sadece satır düzenini düzeltiriz.
  function isVisuallyHiddenInput(input) {
    var cs = window.getComputedStyle(input);
    if (cs.display === 'none' || cs.visibility === 'hidden') return true;
    if (parseFloat(cs.opacity) === 0) return true;
    if (cs.position === 'absolute' &&
        (parseInt(cs.left, 10) < -999 || cs.clip === 'rect(0px, 0px, 0px, 0px)')) return true;
    return false;
  }

  // Tema CSS'ini ezebilmek için !important ile stil basar
  function setImp(el, prop, val) {
    try { el.style.setProperty(prop, val, 'important'); } catch (e) { /* yoksay */ }
  }

  function fixRow(input) {
    if (input.getAttribute('data-kvkk-fixed') === '1') return false;

    var label = findLabel(input);

    // Satır kabı: input'u kapsayan label varsa o, yoksa input'un ebeveyni
    var row = (label && label.contains(input)) ? label : input.parentElement;
    if (!row || row === document.body) return false;

    // 1) Satırı flex yap: kutucuk solda, metin hemen yanında, üstten hizalı
    setImp(row, 'display', 'flex');
    setImp(row, 'flex-direction', 'row');
    setImp(row, 'flex-wrap', 'nowrap');
    setImp(row, 'align-items', 'flex-start');
    setImp(row, 'gap', '10px');
    setImp(row, 'float', 'none');
    setImp(row, 'clear', 'both');
    setImp(row, 'width', '100%');
    setImp(row, 'max-width', '100%');
    setImp(row, 'margin-left', '0');
    setImp(row, 'text-align', 'left');

    // 2) Kutucuk: genel input stillerini (tam genişlik, blok, yükseklik) sıfırla
    if (!isVisuallyHiddenInput(input)) {
      setImp(input, 'display', 'inline-block');
      setImp(input, 'width', '18px');
      setImp(input, 'height', '18px');
      setImp(input, 'min-width', '18px');
      setImp(input, 'min-height', '0');
      setImp(input, 'max-width', 'none');
      setImp(input, 'flex', '0 0 auto');
      setImp(input, 'margin', '3px 0 0 0');
      setImp(input, 'padding', '0');
      setImp(input, 'float', 'none');
      setImp(input, 'position', 'static');
      setImp(input, 'transform', 'none');
      setImp(input, '-webkit-appearance', 'checkbox');
      setImp(input, 'appearance', 'auto');
      setImp(input, 'cursor', 'pointer');
    }

    // 3) Etiket metni: kutunun yanında kalan genişliği kaplasın, alt satıra kaymasın
    if (label && label !== row && row.contains(label)) {
      setImp(label, 'display', 'inline-block');
      setImp(label, 'flex', '1 1 auto');
      setImp(label, 'width', 'auto');
      setImp(label, 'max-width', '100%');
      setImp(label, 'float', 'none');
      setImp(label, 'position', 'static');
      setImp(label, 'margin', '0');
      setImp(label, 'padding', '0');
      setImp(label, 'text-align', 'left');
      setImp(label, 'white-space', 'normal');
      setImp(label, 'cursor', 'pointer');
    }

    input.setAttribute('data-kvkk-fixed', '1');
    return true;
  }

  function run() {
    if (window.innerWidth < MIN_DESKTOP_WIDTH) return 0;
    var inputs = document.querySelectorAll('input[type="checkbox"]');
    var fixed = 0;
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var match = isConsentText(rowTextFor(input)) ||
                  isConsentText(input.name) ||
                  isConsentText(input.id) ||
                  isConsentText(input.className);
      if (match && fixRow(input)) fixed++;
    }
    if (fixed > 0) {
      console.log('[kvkk-fix] ' + fixed + ' onay kutusu satırı yeniden hizalandı.');
    }
    return fixed;
  }

  function init() {
    var total = run();

    // Form geç yükleniyorsa (ajax/widget) ilk 10 sn boyunca DOM'u izle
    if (window.MutationObserver) {
      var observer = new MutationObserver(function () { total += run(); });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(function () {
        observer.disconnect();
        if (total === 0) {
          console.warn('[kvkk-fix] KVKK/Aydınlatma onay kutusu bulunamadı. ' +
            'Form bir iframe içindeyse bu betik ona erişemez; ' +
            'form sayfadaysa anahtar kelime listesinin metinle eşleştiğini kontrol edin.');
        }
      }, 10000);
    }

    // Pencere daraltılıp tekrar genişletilirse yeniden dene
    window.addEventListener('resize', run);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
