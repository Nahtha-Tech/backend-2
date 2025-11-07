import crypto from "crypto";

// 1. PUT YOUR REAL WEBHOOK SECRET HERE
const secret = Bun.env.WAYL_WEBHOOK_SECRET;

// 2. This is the test data you will send
const payload = `{"verb":"POST","event":"order.created","referenceId":"sub-778f1dad-cc1d-4883-a5a4-de3689c823bd-1762512273148","paymentMethod":"Card","paymentStatus":"Completed","paymentProcessor":"Switch","total":1000,"commission":635,"code":"2G3EE0C7","customer":{"id":"cmhhuir4k00gtqw07hra3to57","name":"عمر جتين عبدالكريم رفيق","phone":"+964 771 069 7645","city":"iraq_baghdad","country":"IQ","address":"Kirkuk, al_wasiti"},"items":[{"type":"increase","image":"https://www.fabulousflowers.co.za/cdn/shop/files/LushWonderFlowerBouquet-FabulousFlowersandGifts3.jpg","label":"qeeq","amount":1000}],"id":"cmhoqau8z0061ly086sta42zv","completedAt":"2025-11-07T11:20:00.000Z"}`;

// 3. This code generates the signature
const calculatedSignature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

// 4. This prints the signature you need for Postman
console.log(calculatedSignature);
