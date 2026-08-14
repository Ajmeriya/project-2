export default function TemplateCard({ template }) {
  return (
    <div
      style={{
        border: '1px solid #dbe3f0',
        borderRadius: 12,
        padding: '1rem',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
      }}
    >
      <p style={{ margin: 0, fontWeight: 700 }}>{template.name}</p>
      <small style={{ color: '#64748b' }}>{template.category}</small>
    </div>
  )
}
