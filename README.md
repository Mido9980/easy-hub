# EASY HUB — بوابة التطبيقات + API

موقع واحد بيشغّل كل المواقع والتطبيقات، ومعاه API بصيغة JSON ووثائق كاملة.

## الصفحات
1. index.html — البوابة: بحث، تصنيفات، كروت تشغيل
2. docs.html — وثائق الـ API

## نقاط النهاية
1. GET /api/apps.json — كل التطبيقات
2. GET /api/apps/<slug>.json — تطبيق واحد
3. GET /api/health.json — الحالة

## الإضافة
عدّل assets/data.js ثم شغّل:
python3 tools/build_api.py
وانشر.

## النشر
https://easy-hub-ochre.vercel.app
