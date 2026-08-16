import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  Stack,
  Button,
} from '@mui/material'

const configs = [
  { label: 'Auto-approve high confidence records', enabled: true },
  { label: 'Flag mismatched phone numbers', enabled: true },
  { label: 'Enable handwritten OCR fallback', enabled: false },
  { label: 'Send low-confidence cases to review queue', enabled: true },
]

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
        Workflow Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Processing Rules
              </Typography>

              <Stack spacing={2}>
                {configs.map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body1">{item.label}</Typography>
                    <Switch defaultChecked={item.enabled} color="primary" />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Thresholds
              </Typography>

              <Stack spacing={2}>
                <TextField label="Auto-accept confidence" defaultValue="92" fullWidth />
                <TextField label="Manual review confidence" defaultValue="75" fullWidth />
                <TextField label="OCR retry limit" defaultValue="2" fullWidth />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Button variant="contained" fullWidth>
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
