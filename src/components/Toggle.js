export default function Toggle({ label, defaultChecked = false, onChange }) {
  return (
    <label style={toggleRow}>
      <span>{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    </label>
  );
}

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};
