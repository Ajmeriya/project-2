import { useEffect, useState } from 'react'
import { api } from '../api'
import DocumentList from '../components/document/DocumentList'
import TemplateCard from '../components/template/TemplateCard'

export default function HomePage() {
  const [templates, setTemplates] = useState([])
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    api.getTemplates().then(setTemplates)
    api.getDocuments().then(setDocuments)
  }, [])

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <section>
        <h2 style={{ marginBottom: '1rem' }}>Templates</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '1rem' }}>Documents</h2>
        <DocumentList documents={documents} />
      </section>
    </div>
  )
}
