# 🏪 كلاشي - Clashy PWA

<div align="center">

![Clashy Logo](https://wgvkbrmcgejscgsyapcs.supabase.co/storage/v1/object/public/images//Clashy.png)

**تطبيق PWA متطور يجمع أفضل المتاجر المحلية في شبكة تفاعلية**

[![PWA](https://img.shields.io/badge/PWA-enabled-blue.svg)](https://krarar.github.io/Clashy/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-green.svg)](https://krarar.github.io/Clashy/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-orange.svg)](https://supabase.com/)
[![Version](https://img.shields.io/badge/Version-5.0.0-purple.svg)](https://github.com/krarar/Clashy)

[🚀 تجربة التطبيق](https://krarar.github.io/Clashy/) | [📱 تثبيت PWA](https://krarar.github.io/Clashy/) | [📞 تواصل معنا](https://wa.me/9647813798636)

</div>

## ✨ المميزات الجديدة - التحديث الخامس PWA

### 📱 Progressive Web App (PWA)
- **قابل للتثبيت** على الهاتف والحاسوب
- **يعمل بدون اتصال** مع Service Worker
- **تحديثات تلقائية** في الخلفية
- **أداء فائق** مع التخزين المؤقت الذكي
- **إشعارات فورية** (قريباً)

### 🔗 قاعدة البيانات السحابية
- **Supabase Database** للتخزين السحابي
- **تحديثات فورية** بين جميع المستخدمين
- **مزامنة تلقائية** للبيانات
- **نسخ احتياطية** آمنة

### 🎨 تصميم متطور
- **خلفية مخصصة** بشعار كلاشي
- **50+ أيقونة** للمتاجر المختلفة
- **16 لون** متدرج للتخصيص
- **تفاعلات ثلاثية الأبعاد** محسنة
- **تصميم متجاوب** لجميع الأجهزة

### ⚡ الأداء والتحسينات
- **Service Worker** للعمل بدون نت
- **تخزين مؤقت ذكي** للملفات
- **تحميل سريع** مع التحسينات
- **استهلاك قليل للبيانات**

## 🚀 التثبيت والاستخدام

### طريقة 1: تثبيت PWA مباشرة
1. افتح [https://krarar.github.io/Clashy/](https://krarar.github.io/Clashy/)
2. اضغط على زر "تثبيت" أو استخدم قائمة المتصفح
3. استمتع بالتطبيق على شاشة هاتفك!

### طريقة 2: رفع إلى GitHub Pages
1. **Fork هذا المشروع** أو حمل الملفات
2. **ارفع الملفات** إلى repository جديد
3. **فعل GitHub Pages** في إعدادات Repository
4. **اربط دومين مخصص** (اختياري)

```bash
git clone https://github.com/krarar/Clashy.git
cd Clashy
# ارفع الملفات إلى GitHub repository الخاص بك
```

### طريقة 3: تشغيل محلي
```bash
# استخدم أي خادم HTTP محلي
python -m http.server 8000
# أو
npx serve .
# أو
php -S localhost:8000
```

## 📁 هيكل الملفات

```
Clashy/
├── 📄 index.html              # الصفحة الرئيسية
├── 📱 manifest.json           # PWA Manifest
├── ⚙️ service-worker.js       # Service Worker للـ PWA
├── 📁 js/
│   └── 📄 app.js              # JavaScript الرئيسي
├── 📁 icons/                  # أيقونات PWA
│   ├── 🖼️ icon-72x72.png
│   ├── 🖼️ icon-96x96.png
│   ├── 🖼️ icon-128x128.png
│   ├── 🖼️ icon-144x144.png
│   ├── 🖼️ icon-152x152.png
│   ├── 🖼️ icon-192x192.png
│   ├── 🖼️ icon-384x384.png
│   └── 🖼️ icon-512x512.png
├── 📁 screenshots/            # لقطات شاشة للـ PWA
│   ├── 🖼️ desktop-screenshot.png
│   └── 🖼️ mobile-screenshot.png
├── 🤖 robots.txt              # تعليمات محركات البحث
├── 🌐 sitemap.xml             # خريطة الموقع
└── 📖 README.md               # هذا الملف
```

## 🔧 إعداد قاعدة البيانات

### Supabase Setup
1. إنشاء حساب على [Supabase](https://supabase.com/)
2. إنشاء مشروع جديد
3. إنشاء جدول `stores`:

```sql
CREATE TABLE stores (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  icon VARCHAR(100),
  color VARCHAR(50),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public stores are viewable by everyone" ON stores
  FOR SELECT USING (true);

-- Create policies for authenticated insert/update
CREATE POLICY "Authenticated users can insert stores" ON stores
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update stores" ON stores
  FOR UPDATE USING (auth.role() = 'authenticated');
```

4. تحديث المتغيرات في `js/app.js`:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

## 🎯 الميزات التقنية

### Service Worker
- **Cache-First** للملفات الثابتة
- **Network-First** لبيانات API
- **Stale-While-Revalidate** للمحتوى العام
- **Background Sync** للتحديثات
- **Push Notifications** (قريباً)

### PWA Manifest
- **تثبيت تلقائي** مع prompt
- **شاشة splash** مخصصة
- **وضع standalone** بدون شريط المتصفح
- **اختصارات تطبيق** للوصول السريع
- **Share Target** لمشاركة المحتوى

### تحسينات الأداء
- **تحميل تدريجي** للصور
- **Debounced events** للبحث
- **Virtual scrolling** للقوائم الطويلة
- **Code splitting** للملفات الكبيرة
- **Resource hints** للتحميل المسبق

## 🎨 التخصيص

### إضافة متجر جديد (للمدراء)
1. فعل وضع الإدارة بكلمة مرور: `admin123`
2. اضغط على "إضافة متجر جديد"
3. املأ البيانات واختر الأيقونة واللون
4. احفظ في قاعدة البيانات

### الألوان المتاحة
- 🟣 بنفسجي، 🔵 أزرق، 🔴 أحمر، 🟢 أخضر
- 🟡 أصفر، 🩷 وردي، 🟪 بنفسجي فاتح، 🔵 نيلي
- 🩵 سماوي، 🐚 تركوازي، 💚 زمردي، 🟢 ليموني
- 🟠 برتقالي، 🟠 كهرماني، 🌹 وردي غامق، ⚫ رمادي

### الأيقونات المتاحة
- 🛍️ **تسوق وملابس**: ملابس، أحذية، حقائب
- 🍕 **طعام ومشروبات**: مطاعم، مقاهي، حلويات
- 🏠 **منزل ومعيشة**: أثاث، إضاءة، أدوات
- 📱 **تكنولوجيا**: هواتف، لابتوب، ألعاب
- 🚗 **سيارات**: سيارات، دراجات، صيانة
- 💄 **جمال وعناية**: صالونات، عطور، سبا
- وأكثر من 40 أيقونة أخرى...

## ⌨️ اختصارات لوحة المفاتيح

| الاختصار | الوظيفة |
|----------|---------|
| `Ctrl + H` | العودة للرئيسية |
| `Ctrl + S` | الانتقال للمتاجر |
| `Ctrl + C` | فتح نافذة التواصل |
| `Ctrl + R` | مزامنة البيانات |
| `Ctrl + I` | تثبيت PWA |
| `Escape` | إغلاق النوافذ المنبثقة |

## 📱 دعم المتصفحات

| المتصفح | PWA | Service Worker | تثبيت |
|---------|-----|---------------|-------|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Firefox 85+ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Samsung Internet | ✅ | ✅ | ✅ |

## 🔒 الأمان والخصوصية

- **HTTPS مطلوب** لميزات PWA
- **RLS (Row Level Security)** في Supabase
- **CSP Headers** لحماية XSS
- **No localStorage** للبيانات الحساسة
- **Secure Cookies** للجلسات

## 🚀 التطوير المستقبلي

### Version 6.0 (قريباً)
- [ ] 🔔 **Push Notifications** للعروض والتحديثات
- [ ] 🔄 **Background Sync** المتقدم
- [ ] 🌙 **وضع ليلي** تلقائي
- [ ] 🌍 **دعم متعدد اللغات** (English, Kurdish)
- [ ] 🛒 **سلة تسوق** مشتركة
- [ ] 💳 **دفع إلكتروني** متكامل
- [ ] 📊 **إحصائيات متقدمة** للمدراء
- [ ] 🔍 **بحث ذكي** مع فلاتر
- [ ] 📍 **خرائط المتاجر** مع GPS
- [ ] 🎯 **برنامج ولاء** للعملاء

### Version 7.0 (الذكاء الاصطناعي)
- [ ] 🤖 **توصيات ذكية** بالـ AI
- [ ] 🗣️ **بحث صوتي** بالعربية
- [ ] 📸 **بحث بالصورة** للمنتجات
- [ ] 💬 **شات بوت** للدعم التلقائي

## 👥 المساهمة

نرحب بمساهماتكم! 

1. **Fork** المشروع
2. إنشاء **branch** جديد للميزة
3. **Commit** التغييرات
4. **Push** إلى البranch
5. فتح **Pull Request**

### قواعد المساهمة
- استخدم **Arabic** في التعليقات والواجهة
- اتبع **معايير التسمية** الموجودة
- اختبر على **متعدد المتصفحات**
- حافظ على **الأداء** والسرعة

## 📞 التواصل والدعم

<div align="center">

### 🏢 معلومات التواصل

**📍 الموقع:** العراق - بغداد  
**📞 الهاتف:** [07813798636](tel:+9647813798636) (السعبري)  
**📧 البريد:** info@emall-iq.com  
**💬 واتساب:** [تواصل معنا](https://wa.me/9647813798636)  
**🌐 الموقع:** [krarar.github.io/Clashy](https://krarar.github.io/Clashy/)

</div>

### 🐛 الإبلاغ عن مشاكل
- افتح [Issue جديد](https://github.com/krarar/Clashy/issues)
- أرفق لقطة شاشة إن أمكن
- اذكر نوع المتصفح والجهاز

### 💡 اقتراح ميزات
- افتح [Feature Request](https://github.com/krarar/Clashy/issues)
- اشرح الميزة المطلوبة بالتفصيل
- أرفق mockup إن أمكن

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License** - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير

- **[Supabase](https://supabase.com/)** - قاعدة البيانات السحابية
- **[Font Awesome](https://fontawesome.com/)** - الأيقونات
- **[Google Fonts](https://fonts.google.com/)** - خط Tajawal
- **[GitHub Pages](https://pages.github.com/)** - الاستضافة المجانية

---

<div align="center">

**🌟 إذا أعجبك المشروع، لا تنس وضع نجمة! ⭐**

Made with ❤️ in Iraq 🇮🇶

**كلاشي © 2025 - PWA التحديث الخامس**

[⬆️ العودة للأعلى](#-كلاشي---clashy-pwa)

</div>
