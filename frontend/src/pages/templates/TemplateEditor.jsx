import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Add, DeleteOutlined, Save, ZoomIn, ZoomOut } from '@mui/icons-material'

const initialFields = [
  { id: 1, name: 'Name', type: 'Text', x: 18, y: 14, width: 36, height: 8 },
  { id: 2, name: 'Date of Birth', type: 'Date', x: 18, y: 28, width: 30, height: 8 },
  { id: 3, name: 'Phone Number', type: 'Phone', x: 58, y: 28, width: 24, height: 8 },
  { id: 4, name: 'Address', type: 'TextArea', x: 18, y: 44, width: 60, height: 18 },
  { id: 5, name: 'Signature', type: 'Signature', x: 66, y: 70, width: 22, height: 12 },
]

const fieldTypes = ['Text', 'Date', 'Phone', 'TextArea', 'Signature', 'Number']

export default function TemplateEditorPage() {
  const [fields, setFields] = useState(initialFields)
  const [selectedFieldId, setSelectedFieldId] = useState(1)
  const [zoom, setZoom] = useState(1)

  const selectedField = useMemo(
    () => fields.find((field) => field.id === selectedFieldId) ?? fields[0],
    [fields, selectedFieldId],
  )

  const updateSelectedField = (key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === selectedFieldId
          ? { ...field, [key]: key === 'name' || key === 'type' ? value : Number(value) }
          : field,
      ),
    )
  }

  const addField = () => {
    const nextId = Date.now()
    const newField = {
      id: nextId,
      name: `Field ${fields.length + 1}`,
      type: 'Text',
      x: 12 + (fields.length % 4) * 10,
      y: 12 + (fields.length % 3) * 12,
      width: 24,
      height: 8,
    }
    setFields((prev) => [...prev, newField])
    setSelectedFieldId(nextId)
  }

  const deleteField = () => {
    if (fields.length <= 1) return
    setFields((prev) => prev.filter((field) => field.id !== selectedFieldId))
    setSelectedFieldId(fields.find((field) => field.id !== selectedFieldId)?.id ?? fields[0].id)
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
            Template Editor
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Bank KYC Template
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <IconButton onClick={() => setZoom((prev) => Math.max(0.75, Number((prev - 0.1).toFixed(2))))}>
            <ZoomOut />
          </IconButton>
          <Chip label={`${Math.round(zoom * 100)}%`} color="primary" variant="outlined" />
          <IconButton onClick={() => setZoom((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(2))))}>
            <ZoomIn />
          </IconButton>
          <Button variant="contained" startIcon={<Save />}>
            Save Template
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  mx: 'auto',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: 1,
                  borderColor: 'divider',
                  background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', p: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid rgba(15, 23, 42, 0.12)',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ px: 4, py: 3, fontSize: 12, color: 'text.secondary', lineHeight: 1.8 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                        KYC Application Form
                      </Typography>
                      <Typography>Name:</Typography>
                      <Typography>DOB:</Typography>
                      <Typography>Address:</Typography>
                      <Typography>Phone:</Typography>
                      <Typography>Signature:</Typography>
                    </Box>

                    {fields.map((field) => (
                      <Box
                        key={field.id}
                        onClick={() => setSelectedFieldId(field.id)}
                        sx={{
                          position: 'absolute',
                          left: `${field.x}%`,
                          top: `${field.y}%`,
                          width: `${field.width}%`,
                          height: `${field.height}%`,
                          border: field.id === selectedFieldId ? '2px solid #2563eb' : '2px solid rgba(37,99,235,0.4)',
                          borderRadius: 1.5,
                          background: field.id === selectedFieldId ? 'rgba(37,99,235,0.08)' : 'rgba(148,163,184,0.06)',
                          boxShadow: field.id === selectedFieldId ? '0 0 0 3px rgba(37,99,235,0.08)' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          p: 0.75,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            px: 0.7,
                            py: 0.25,
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 1,
                            backgroundColor: field.id === selectedFieldId ? 'primary.main' : 'rgba(15,23,42,0.05)',
                            color: field.id === selectedFieldId ? 'common.white' : 'text.primary',
                          }}
                        >
                          {field.name}
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Field Properties
              </Typography>

              {selectedField ? (
                <Stack spacing={2}>
                  <TextField
                    label="Field name"
                    value={selectedField.name}
                    onChange={(e) => updateSelectedField('name', e.target.value)}
                    fullWidth
                    size="small"
                  />

                  <TextField
                    select
                    label="Field type"
                    value={selectedField.type}
                    onChange={(e) => updateSelectedField('type', e.target.value)}
                    fullWidth
                    size="small"
                  >
                    {fieldTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                      <TextField label="X %" value={selectedField.x} onChange={(e) => updateSelectedField('x', e.target.value)} fullWidth size="small" />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField label="Y %" value={selectedField.y} onChange={(e) => updateSelectedField('y', e.target.value)} fullWidth size="small" />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField label="Width %" value={selectedField.width} onChange={(e) => updateSelectedField('width', e.target.value)} fullWidth size="small" />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField label="Height %" value={selectedField.height} onChange={(e) => updateSelectedField('height', e.target.value)} fullWidth size="small" />
                    </Grid>
                  </Grid>

                  <Divider />

                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" startIcon={<Add />} onClick={addField} fullWidth>
                      Add
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteOutlined />} onClick={deleteField} fullWidth>
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              ) : null}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Fields in template
              </Typography>

              <List disablePadding>
                {fields.map((field) => (
                  <ListItem key={field.id} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      selected={field.id === selectedFieldId}
                      onClick={() => setSelectedFieldId(field.id)}
                      sx={{ borderRadius: 2, px: 1.5, py: 1 }}
                    >
                      <ListItemText
                        primary={field.name}
                        secondary={`${field.type} • ${field.x}, ${field.y} • ${field.width}x${field.height}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
