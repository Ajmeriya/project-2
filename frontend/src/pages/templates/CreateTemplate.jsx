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

export default function CreateTemplatePage() {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
        Template Setup
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Create a new document template
      </Typography>

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
                <Button variant="contained" startIcon={<CloudUpload />}>
                  Select Empty Form
                </Button>
              </Paper>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                <TextField label="Template name" defaultValue="Bank KYC Template" fullWidth />
                <TextField label="Document category" defaultValue="Banking / KYC" fullWidth />
                <TextField label="Description" defaultValue="Customer onboarding and identity verification form" fullWidth multiline minRows={3} />
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
                {['Name', 'Date of Birth', 'Phone Number', 'Address', 'Signature', 'PAN Number'].map((field) => (
                  <Box key={field} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Description color="primary" fontSize="small" />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{field}</Typography>
                    </Stack>
                    <Verified color="success" fontSize="small" />
                  </Box>
                ))}
              </Stack>

              <Button variant="contained" fullWidth sx={{ mt: 3 }}>
                Save Template
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
