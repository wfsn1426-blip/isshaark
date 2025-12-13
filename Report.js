import { useState } from "react";
import { analyzeReport } from "./analyze";

function Report() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);

  const onAnalyze = () => {
    const res = analyzeReport({ text, url, phone });
    setResult(res);
  };

  return (
    <div>
      <h2>رفع بلاغ</h2>

      <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="رقم/مرسل (اختياري)" />
      <br /><br />

      <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="رابط (اختياري)" />
      <br /><br />

      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="نص الرسالة/تفاصيل البلاغ" />
      <br /><br />

      <button onClick={onAnalyze}>🧠 تحليل ذكي</button>

      {result && (
        <div style={{ marginTop: 16 }}>
          <h3>النتيجة</h3>
          <p>درجة الخطورة: {result.riskScore}/100</p>
          <p>التصنيف: {result.category}</p>
          <p>التوصية: {result.advice}</p>
          <ul>
            {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Report;
