import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CheckCircleOutlined, HighlightOff, Preview, Save } from '@mui/icons-material'

const extractedFields = [
  { label: 'Customer Name', value: 'Harsh Ajmeriya', confidence: '96%' },
  { label: 'Date of Birth', value: '15/08/2004', confidence: '93%' },
  { label: 'Phone Number', value: '9876543210', confidence: '94%' },
  { label: 'Address', value: 'B-24, Sector 18, Noida', confidence: '89%' },
]

export default function ReviewPage() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
            Review Workspace
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Human Review for Low Confidence Fields
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="error" startIcon={<HighlightOff />}>
            Reject
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            Save & Approve
          </Button>
        </Stack>
      </Stack>

      <Alert severity="warning" sx={{ mb: 3, borderRadius: 3 }}>
        3 fields require review. The system flagged a low-confidence address and a phone mismatch.
      </Alert>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Document Preview
              </Typography>

              <Paper
                sx={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ position: 'absolute', inset: 0, p: 3 }}>
                  <Box sx={{ width: '100%', height: '100%', borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.12)', bgcolor: 'rgba(255,255,255,0.4)', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: '12%', top: '12%', width: '42%', height: 34, border: '2px solid rgba(37,99,235,0.8)', borderRadius: 1 }} />
                    <Box sx={{ position: 'absolute', left: '12%', top: '28%', width: '35%', height: 30, border: '2px solid rgba(37,99,235,0.8)', borderRadius: 1 }} />
                    <Box sx={{ position: 'absolute', left: '12%', top: '46%', width: '58%', height: 72, border: '2px solid rgba(245,158,11,0.9)', borderRadius: 1 }} />
                    <Box sx={{ position: 'absolute', left: '12%', top: '70%', width: '38%', height: 30, border: '2px solid rgba(34,197,94,0.8)', borderRadius: 1 }} />
                  </Box>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Extracted Data
              </Typography>
              <List disablePadding>
                {extractedFields.map((field) => (
                  <ListItem key={field.label} divider sx={{ display: 'block', px: 0, py: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{field.label}</Typography>
                      <Chip label={field.confidence} size="small" color={field.confidence > '90%' ? 'success' : 'warning'} />
                    </Stack>
                    <TextField value={field.value} fullWidth size="small" />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" startIcon={<CheckCircleOutlined />}>
                  Accept All
                </Button>
                <Button variant="text" startIcon={<Preview />}>
                  Compare Template
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
