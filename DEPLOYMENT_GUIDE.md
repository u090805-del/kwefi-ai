# 🚀 دليل نشر Kwefi AI على Vercel

## الخطوة 1 — رفع الكود على GitHub

1. افتح [github.com](https://github.com) وسجّل دخول (أو أنشئ حساباً مجاناً)
2. اضغط على **"New repository"** (الزر الأخضر)
3. سمّه: `kwefi-ai-advisor`
4. اضغط **"Create repository"**
5. ارفع ملفات المشروع (اسحب وأفلت أو استخدم GitHub Desktop)

---

## الخطوة 2 — الحصول على API Key من Anthropic

1. افتح [console.anthropic.com](https://console.anthropic.com)
2. سجّل حساباً جديداً
3. اذهب إلى **"API Keys"**
4. اضغط **"Create Key"**
5. انسخ المفتاح واحتفظ به — لن يظهر مرة ثانية!

> 💡 التكلفة: تقريباً 2-5 سنت لكل محادثة. تبدأ بـ $5 رصيد مجاني.

---

## الخطوة 3 — النشر على Vercel

1. افتح [vercel.com](https://vercel.com) وسجّل دخول بحساب GitHub
2. اضغط **"Add New Project"**
3. اختر مشروع `kwefi-ai-advisor` من قائمة مشاريعك
4. قبل الضغط على Deploy، افتح **"Environment Variables"**
5. أضف المتغير التالي:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** المفتاح الذي نسخته من Anthropic
6. اضغط **"Deploy"** ✅

---

## الخطوة 4 — رابطك الجاهز!

بعد الانتهاء ستحصل على رابط مثل:
```
https://kwefi-ai-advisor.vercel.app
```

شارك هذا الرابط مع عملائك — يعمل فوراً على الجوال والكمبيوتر!

---

## 📱 تثبيت التطبيق على الهاتف (بدون متجر!)

### iPhone:
1. افتح الرابط في Safari
2. اضغط على زر المشاركة (⬆️)
3. اختر **"Add to Home Screen"**
4. اضغط **"Add"** — التطبيق سيظهر على الشاشة الرئيسية!

### Android:
1. افتح الرابط في Chrome
2. اضغط على النقاط الثلاث (⋮)
3. اختر **"Add to Home Screen"**
4. اضغط **"Add"** ✅

---

## 🛠 إدارة التطبيق بعد النشر

### تغيير الأسئلة السريعة:
افتح ملف `src/app/KwefiAdvisor.js` وابحث عن:
```
const QUICK_QUESTIONS = [...]
```
غيّر النصوص كما تريد، ثم ارفع التغييرات على GitHub — Vercel سينشر تلقائياً!

### تغيير شخصية الـ AI:
في ملف `src/app/api/chat/route.js`، ابحث عن:
```
const SYSTEM_PROMPT = `...`
```
عدّل التعليمات حسب احتياجك.

### مراقبة الاستخدام والتكلفة:
- افتح [console.anthropic.com](https://console.anthropic.com) → Usage
- ستجد رسوماً تفصيلية لكل يوم

---

## 🔧 أسئلة شائعة

**هل التطبيق آمن؟**
نعم — مفتاح API محفوظ على الخادم فقط، المستخدمون لا يرونه أبداً.

**كم يستغرق النشر؟**
من 5 إلى 10 دقائق أول مرة.

**هل أحتاج بطاقة ائتمانية؟**
Vercel مجاني تماماً. Anthropic تحتاج بطاقة للشحن (تبدأ بـ $5).

**هل يمكنني ربط دومين خاص؟**
نعم — من لوحة Vercel → Domains → أضف دومينك.

---

## 📞 هيكل ملفات المشروع

```
kwefi-app/
├── src/
│   └── app/
│       ├── layout.js          ← إعدادات الصفحة العامة
│       ├── page.js            ← الصفحة الرئيسية
│       ├── KwefiAdvisor.js    ← واجهة التطبيق الكاملة
│       └── api/
│           └── chat/
│               └── route.js  ← اتصال Claude AI (سري)
├── public/
│   └── manifest.json         ← إعدادات التطبيق للجوال
├── package.json
├── next.config.js
├── .env.example              ← نموذج المتغيرات (لا ترفع .env الحقيقي!)
└── .gitignore
```
