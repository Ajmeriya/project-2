export default function DocumentList({ documents }) {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {documents.map((document) => (
        <div
          key={document.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #dbe3f0',
            borderRadius: 10,
            padding: '0.9rem 1rem',
            background: '#fff',
          }}
        >
          <span>{document.title}</span>
          <span
            style={{
              background: '#e2e8f0',
              borderRadius: 999,
              padding: '0.25rem 0.6rem',
              fontSize: '0.75rem',
            }}
          >
            {document.status}
          </span>
        </div>
      ))}
    </div>
  )
}
