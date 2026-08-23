import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { documentApi } from '../../api/documentApi'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CloudUpload, CheckCircle, FileCopyOutlined, ImageOutlined, UploadFile } from '@mui/icons-material'

const checks = [
  'Upload an empty template first to define field positions',
  'Then upload the filled form to align and extract data',
  'Validate fields and send low-confidence values to review',
]

export default function UploadDocumentPage() {
  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [documents, setDocuments] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [form, setForm] = useState({ formName: 'Bank KYC', customer: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadDocuments = () => {
    setIsLoadingHistory(true)
    documentApi.list()
      .then(setDocuments)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoadingHistory(false))
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  const uploadDocument = async () => {
    if (!file || !form.customer.trim()) {
      setError('Select a filled document and enter the customer name')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      await documentApi.upload(form, file)
      setFile(null)
      setForm({ ...form, customer: '' })
      if (fileInputRef.current) fileInputRef.current.value = ''
      loadDocuments()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
        Document Workflow
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Upload template and filled document
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Step 1: Upload empty form template
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    border: '2px dashed',
                    borderColor: 'primary.light',
                    borderRadius: 4,
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.03), rgba(15,23,42,0.01))',
                  }}
                >
                  <FileCopyOutlined sx={{ fontSize: 52, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Blank form / template
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload the empty form to detect field coordinates like Name, DOB, Address, Phone.
                  </Typography>
                  <Button variant="contained" startIcon={<UploadFile />}>
                    Select Empty Form
                  </Button>
                </Paper>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Step 2: Upload filled document for extraction
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    border: '2px dashed',
                    borderColor: 'secondary.main',
                    borderRadius: 4,
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.02), rgba(15,23,42,0.01))',
                  }}
                >
                  <CloudUpload sx={{ fontSize: 52, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Filled form to extract data
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload the completed form after the blank template is ready. The system will align and read the fields.
                  </Typography>
                  <input ref={fileInputRef} hidden type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
                  <Button variant="contained" color="secondary" startIcon={<UploadFile />} onClick={() => fileInputRef.current?.click()}>
                    Select Filled Form
                  </Button>
                  {file && <Typography variant="caption" display="block" sx={{ mt: 1 }}>Selected: {file.name}</Typography>}
                  <TextField label="Customer name" value={form.customer} onChange={(event) => setForm({ ...form, customer: event.target.value })} sx={{ mt: 2, maxWidth: 360 }} fullWidth required />
                </Paper>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Upload Summary
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">Template</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Bank KYC - v3.2</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">Empty form status</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Ready for field detection</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">Filled form status</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Waiting for upload</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Processing Checklist
              </Typography>
              <List>
                {checks.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.8 }}>
                    <ListItemIcon sx={{ minWidth: 34 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              {error && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{error}</Typography>}
              <Button variant="contained" fullWidth onClick={uploadDocument} disabled={isSubmitting} sx={{ mb: 2 }}>
                {isSubmitting ? 'Uploading...' : 'Upload Document'}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 3, bgcolor: 'background.default' }}>
                <ImageOutlined color="primary" />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Alignment workflow</Typography>
                  <Typography variant="caption" color="text.secondary">Empty form → field map → filled form → extracted data</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1} sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Previous uploads</Typography>
                  <Typography variant="body2" color="text.secondary">Saved documents for your account</Typography>
                </Box>
                <Button component={Link} to="/documents" variant="outlined">View all documents</Button>
              </Stack>

              {isLoadingHistory && <Typography color="text.secondary">Loading upload history...</Typography>}
              {!isLoadingHistory && documents.length === 0 && <Typography color="text.secondary">No documents uploaded yet.</Typography>}
              {!isLoadingHistory && documents.length > 0 && (
                <Stack spacing={1}>
                  {documents.slice(0, 5).map((document) => (
                    <Stack key={document.id} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={0.5} sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{document.documentNumber}</Typography>
                        <Typography variant="body2" color="text.secondary">{document.formName} | {document.customer}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">{new Date(document.createdAt).toLocaleString()}</Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
