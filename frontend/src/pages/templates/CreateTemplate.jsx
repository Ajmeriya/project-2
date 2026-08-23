import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CloudUpload, Description, Verified } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { templateApi } from '../../api/templateApi'

const defaultFields = ['Name', 'Date of Birth', 'Phone Number', 'Address', 'Signature', 'PAN Number']

export default function CreateTemplatePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: 'Bank KYC Template',
    category: 'Banking / KYC',
    description: 'Customer onboarding and identity verification form',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return undefined
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const updateField = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const saveTemplate = async (event) => {
    event.preventDefault()
    setError('')
    if (!selectedFile) {
      setError('Select an empty form before saving the template')
      return
    }
    setIsSubmitting(true)
    try {
      const template = await templateApi.create({
        ...form,
        fields: JSON.stringify(defaultFields.map((name, index) => ({
          name,
          type: index === 1 ? 'Date' : index === 2 ? 'Phone' : index === 4 ? 'Signature' : 'Text',
          x: 18,
          y: 14 + index * 10,
          width: 36,
          height: 8,
        }))),
      }, selectedFile)
      navigate(`/templates/${template.id}/edit`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
        Template Setup
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Create a new document template
      </Typography>

      <form onSubmit={saveTemplate}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                1. Upload empty form
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.light',
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.02), rgba(15,23,42,0.01))',
                }}
              >
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Drop the empty form here
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload a blank KYC, intake, claim, or government form to define fields.
                </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  hidden
                  onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                />
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select Empty Form
                </Button>
                {selectedFile && (
                  <Box sx={{ mt: 2, textAlign: 'left' }}>
                    <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                      Selected: {selectedFile.name}
                    </Typography>
                    {selectedFile.type === 'application/pdf' ? (
                      <Box component="iframe" src={previewUrl} title="Empty form preview" sx={{ width: '100%', height: 360, border: 1, borderColor: 'divider', borderRadius: 2 }} />
                    ) : (
                      <Box component="img" src={previewUrl} alt="Empty form preview" sx={{ display: 'block', maxWidth: '100%', maxHeight: 360, mx: 'auto', border: 1, borderColor: 'divider', borderRadius: 2, objectFit: 'contain' }} />
                    )}
                  </Box>
                )}
              </Paper>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                <TextField label="Template name" value={form.name} onChange={updateField('name')} fullWidth required />
                <TextField label="Document category" value={form.category} onChange={updateField('category')} fullWidth required />
                <TextField label="Description" value={form.description} onChange={updateField('description')} fullWidth multiline minRows={3} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Template fields to detect
              </Typography>

              <Stack spacing={2}>
                {defaultFields.map((field) => (
                  <Box key={field} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Description color="primary" fontSize="small" />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{field}</Typography>
                    </Stack>
                    <Verified color="success" fontSize="small" />
                  </Box>
                ))}
              </Stack>

              {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Template'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </form>
    </Box>
  )
}
