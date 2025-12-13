function NotificationsSettings({ goHome }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>

      <h2 style={{ textAlign: "center" }}>إدارة الإشعارات</h2>
      <p style={{ textAlign: "center", color: "#666" }}>
        فعّل أو أوقف تنبيهات الاحتيال وحدد قناة الإشعار المناسبة
      </p>

      {/* التنبيهات الفورية */}
      <Section title="التنبيهات الفورية">
        <Toggle label="إشعارات التطبيق" defaultChecked />
        <Toggle label="الرسائل النصية (SMS)" defaultChecked />
        <Toggle label="البريد الإلكتروني" />
      </Section>

      {/* نوع التنبيهات */}
      <Section title="نوع التنبيهات">
        <Toggle label="تحذيرات الخطر العالي" defaultChecked />
        <Toggle label="التحذيرات المتوسطة" defaultChecked />
        <Toggle label="المعلومات العامة" />
      </Section>

      {/* الخصوصية */}
      <Section title="إعدادات الخصوصية">
        <Toggle label="مشاركة البيانات لتحسين الخدمة" defaultChecked />
        <Toggle label="إرسال تقارير مجهولة المصدر" defaultChecked />
      </Section>

      {/* الأزرار */}
      <button style={saveBtn}>✔ حفظ الإعدادات</button>

      <button style={backBtn} onClick={goHome}>
        العودة إلى إشعارك
      </button>
    </div>
  );
}

export default NotificationsSettings;
import Toggle from "./components/Toggle";
import Section from "./components/Section";
