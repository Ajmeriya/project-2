import { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { documentApi } from '../../api/documentApi'

export default function DocumentDetailsPage() {
  const { id } = useParams()
  const [document, setDocument] = useState(null)
  const [fileUrl, setFileUrl] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    let active = true
    documentApi.get(id).then(setDocument).catch((requestError) => setError(requestError.message))
    documentApi.file(id).then((file) => {
      const url = URL.createObjectURL(file)
      if (active) setFileUrl(url)
      else URL.revokeObjectURL(url)
    }).catch(() => {})
    return () => {
      active = false
      setFileUrl((url) => {
        if (url) URL.revokeObjectURL(url)
        return ''
      })
    }
  }, [id])

  if (error) return <Typography color="error">{error}</Typography>
  if (!document) return <Typography color="text.secondary">Loading document...</Typography>

  const runStep = async (action) => {
    setIsProcessing(true)
    try {
      setDocument(await action(id))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const nextAction = {
    Queued: ['Align document', documentApi.align],
    Aligned: ['Run OCR / HTR', documentApi.extract],
    Extracted: ['Verify extracted values', documentApi.verify],
    Verified: ['Save final data', documentApi.finalize],
  }[document.status]

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="overline" color="primary.main">Document Details</Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>{document.documentNumber}</Typography>
      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography><strong>Form:</strong> {document.formName}</Typography>
            <Typography><strong>Customer:</strong> {document.customer}</Typography>
            <Typography><strong>Status:</strong> {document.status}</Typography>
            <Typography><strong>Confidence:</strong> {document.confidence}%</Typography>
            <Typography><strong>File:</strong> {document.fileName}</Typography>
            <Typography><strong>Workflow:</strong> {document.status}</Typography>
            {nextAction && <Button variant="contained" onClick={() => runStep(nextAction[1])} disabled={isProcessing} sx={{ alignSelf: 'flex-start' }}>{isProcessing ? 'Processing...' : nextAction[0]}</Button>}
            {document.status === 'Extracted' && <Typography color="text.secondary">Extracted values are ready for human verification.</Typography>}
            {fileUrl && (
              <>
                <Button component="a" href={fileUrl} target="_blank" rel="noreferrer" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                  Open uploaded document
                </Button>
                {document.fileName.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/) && (
                  <Box component="img" src={fileUrl} alt={document.fileName} sx={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }} />
                )}
                {document.fileName.toLowerCase().endsWith('.pdf') && (
                  <Box component="iframe" src={fileUrl} title={document.fileName} sx={{ width: '100%', height: 600, border: 1, borderColor: 'divider' }} />
                )}
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
