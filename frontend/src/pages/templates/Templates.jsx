import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Add, ArrowForward, Description, Edit, UploadFile } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const templates = [
  { id: 1, name: 'Bank KYC Form', version: 'v3.2', fields: 18, status: 'Active', updated: '2 hours ago' },
  { id: 2, name: 'Insurance Claim', version: 'v1.8', fields: 24, status: 'Draft', updated: '1 day ago' },
  { id: 3, name: 'Healthcare Intake', version: 'v2.1', fields: 32, status: 'Active', updated: '3 days ago' },
  { id: 4, name: 'Government ID Annexure', version: 'v4.0', fields: 14, status: 'Review', updated: '5 days ago' },
]

export default function TemplatesPage() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
            Template Library
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Managed Form Templates
          </Typography>
        </Box>

        <Button component={Link} to="/templates/new" variant="contained" startIcon={<Add />} size="large">
          Create Template
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, md: 6, xl: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'primary.light', color: 'primary.main' }}>
                      <Description fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {template.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {template.version}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    size="small"
                    label={template.status}
                    color={template.status === 'Active' ? 'success' : template.status === 'Draft' ? 'info' : 'warning'}
                  />
                </Stack>

                <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {template.fields} mapped fields
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last updated {template.updated}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button component={Link} to={`/templates/${template.id}/edit`} variant="outlined" startIcon={<Edit />} size="small">
                    Edit
                  </Button>
                  <Button variant="text" endIcon={<ArrowForward />} size="small">
                    Preview
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Template detection is ready
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empty form detection, field alignment, and OCR region mapping are configured for the next upload.
              </Typography>
            </Box>
            <Button component={Link} to="/templates/new" variant="contained" startIcon={<UploadFile />}>
              Import Empty Form
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
