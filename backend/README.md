# 💻 Backend ระบบด้วย Elysia.js (Bun)

ระบบ Backend พัฒนาโดยใช้ [**Elysia.js**](https://elysiajs.com) — เว็บเฟรมเวิร์กที่ทำงานบน Bun ซึ่งมีความเร็วสูงและรองรับ TypeScript โดยตรง เหมาะสำหรับการพัฒนา API ที่ทันสมัยและมีประสิทธิภาพ

---

## ⚙️ เทคโนโลยีที่ใช้ (Tech Stack)

| ชั้นระบบ | เทคโนโลยี | รายละเอียด |
|----------|------------|-------------|
| **Runtime** | [**Bun**](https://bun.sh) | JavaScript runtime ที่มีความเร็วสูง รองรับ TypeScript, bundler, และ test ในตัว |
| **Web Framework** | [**Elysia.js**](https://elysiajs.com) | เฟรมเวิร์กที่เบา เร็ว ใช้งานง่าย และปลอดภัย |
| **Database** | PostgreSQL + DrizzleORM / Prisma | ใช้ฐานข้อมูลแบบ relational พร้อม ORM ที่รองรับ TypeScript เต็มรูปแบบ |
| **Authentication** | Lucia / JWT / Clerk | ระบบยืนยันตัวตน (Lucia สำหรับ lightweight, Clerk สำหรับระบบพร้อมใช้งาน) |
| **Validation** | Zod / Valibot | ตรวจสอบและจัดการ schema ของข้อมูลที่ส่งเข้า API |
| **Caching** | Redis | ใช้สำหรับเก็บ session หรือการจำกัดความเร็ว (rate limiting) |
| **Queue & Job** | BullMQ / Bun Worker | จัดการ background jobs เช่นส่งอีเมล, แจ้งเตือน |
| **File Storage** | Cloudinary / AWS S3 | สำหรับอัปโหลดไฟล์และจัดเก็บรูปภาพ |
| **Logging** | Pino / Winston | ระบบบันทึก log แบบมีโครงสร้าง |
| **Environment Config** | dotenv / envsafe | จัดการตัวแปรสภาพแวดล้อม (env variables) |
| **Testing** | Vitest | ทดสอบแบบ unit / integration บน Bun |
| **Documentation** | Swagger / Elysia Swagger Plugin | สร้างเอกสาร API อัตโนมัติ

---

## 🗂 โครงสร้างโปรเจกต์เบื้องต้น