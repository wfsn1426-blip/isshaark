export function analyzeReport({ text = "", url = "", phone = "" }) {
  const t = (text || "").toLowerCase();

  let score = 0;
  const reasons = [];
  let category = "غير محدد";

  const add = (points, reason) => {
    score += points;
    reasons.push(reason);
  };

  // كلمات شائعة بالاحتيال
  const suspiciousWords = [
    { w: "اربح", p: 15, r: "إغراء بالربح" },
    { w: "جائزة", p: 15, r: "وعد بجائزة" },
    { w: "تحويل", p: 10, r: "طلب تحويل مالي" },
    { w: "otp", p: 25, r: "طلب رمز تحقق OTP" },
    { w: "رمز التحقق", p: 25, r: "طلب رمز تحقق" },
    { w: "تحديث بيانات", p: 15, r: "طلب تحديث بيانات" },
    { w: "حسابك سيتم", p: 15, r: "تهديد بإيقاف الحساب" },
    { w: "رابط", p: 8, r: "استخدام روابط" },
  ];

  suspiciousWords.forEach(({ w, p, r }) => {
    if (t.includes(w)) add(p, r);
  });

  // روابط مختصرة (bit.ly ..)
  if (url && /bit\.ly|t\.co|tinyurl|cutt\.ly/i.test(url)) add(20, "رابط مختصر مشبوه");

  // رقم دولي أو غريب (مبدئي)
  if (phone && phone.startsWith("+") && !phone.startsWith("+966")) add(10, "رقم دولي غير محلي");

  // تحديد التصنيف
  if (score >= 60) category = "احتيال عالي الخطورة";
  else if (score >= 30) category = "احتيال محتمل";
  else category = "مخاطرة منخفضة";

  // تثبيت حدود
  if (score > 100) score = 100;

  return {
    riskScore: score,
    category,
    reasons,
    advice:
      score >= 60
        ? "لا تشارك أي رموز/بيانات. لا تفتح الرابط. بلّغ فوراً."
        : score >= 30
        ? "تحقّق من المصدر ولا تشارك أي بيانات. يفضّل الإبلاغ."
        : "مبدئياً لا توجد مؤشرات قوية، لكن كن حذراً."
  };
}
