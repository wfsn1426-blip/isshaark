function Header({ onBack, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px",
        borderBottom: "1px solid #ddd",
        marginBottom: 12,
      }}
    >
      <button onClick={onBack}>⬅️ العودة إلى إشعارك</button>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );
}

export default Header;
