export function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fb', color: '#1f2937' }}>
      <header
        style={{
          padding: '1rem 2rem',
          background: '#111827',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Document Studio</h1>
        <span style={{ opacity: 0.8 }}>Workspace</span>
      </header>

      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  )
}
