import { useEffect, useState } from "react";
import { analyzeReport } from "./analyze"; // إذا عندك التحليل الذكي

function formatDateTime(date = new Date()) {
  // بالعربي (السعودية)
  const dayName = new Intl.DateTimeFormat("ar-SA", { weekday: "long" }).format(date);
  const dateStr = new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const timeStr = new Intl.DateTimeFormat("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return { dayName, dateStr, timeStr };
}

function Report() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);

  const [logs, setLogs] = useState([]);

  // تحميل السجل عند فتح الصفحة
  useEffect(() => {
    const saved = localStorage.getItem("report_logs");
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  // حفظ السجل كل ما يتغير
  useEffect(() => {
    localStorage.setItem("report_logs", JSON.stringify(logs));
  }, [logs]);

  const onAnalyze = () => {
    const res = analyzeReport({ text, url, phone });
    setResult(res);
  };

  const onSubmitReport = () => {
    if (!text.trim() && !url.trim() && !phone.trim()) return;

    const now = new Date();
    const { dayName, dateStr, timeStr } = formatDateTime(now);

    const newLog = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      dayName,
      dateStr,
      timeStr,
      phone: phone.trim(),
      url: url.trim(),
      text: text.trim(),
      // لو تبي تحفظ نتيجة التحليل (اختياري):
      analysis: result ? { riskScore: result.riskScore, category: result.category } : null,
    };

    // نخلي الجديد فوق
    setLogs((prev) => [newLog, ...prev]);

    // تنظيف الحقول
    setText("");
    setUrl("");
    setPhone("");
    setResult(null);
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem("report_logs");
  };

  return (
    <div>
      <h2>رفع بلاغ</h2>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="رقم/مرسل (اختياري)"
      />
      <br /><br />

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="رابط (اختياري)"
      />
      <br /><br />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="نص الرسالة/تفاصيل البلاغ"
        rows={4}
      />
      <br /><br />

      <button onClick={onAnalyze}>🧠 تحليل ذكي</button>
      <button onClick={onSubmitReport} style={{ marginInlineStart: 8 }}>
        ✅ إرسال البلاغ
      </button>

      {result && (
        <div style={{ marginTop: 16 }}>
          <h3>نتيجة التحليل</h3>
          <p>درجة الخطورة: {result.riskScore}/100</p>
          <p>التصنيف: {result.category}</p>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3 style={{ margin: 0 }}>سجل البلاغات</h3>
        <button onClick={clearLogs}>🗑️ مسح السجل</button>
      </div>

      {logs.length === 0 ? (
        <p>لا يوجد بلاغات حتى الآن.</p>
      ) : (
        <div style={{ marginTop: 12 }}>
          {logs.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {item.dayName} — {item.dateStr} — {item.timeStr}
              </div>

              {item.phone && <div>📞 المرسل: {item.phone}</div>}
              {item.url && <div>🔗 الرابط: {item.url}</div>}
              {item.text && <div>📝 البلاغ: {item.text}</div>}

              {item.analysis && (
                <div style={{ marginTop: 6 }}>
                  🧠 التحليل: {item.analysis.category} ({item.analysis.riskScore}/100)
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Report;
import Header from "./Header";

function Report({ goHome }) {
  return (
    <div>
      <Header title="رفع بلاغ" onBack={goHome} />

      {/* محتوى الصفحة */}
      <p>نموذج رفع البلاغ هنا...</p>
    </div>
  );
}

export default Report;
