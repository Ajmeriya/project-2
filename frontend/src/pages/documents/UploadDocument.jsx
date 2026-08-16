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
  Typography,
} from '@mui/material'
import { CloudUpload, CheckCircle, FileCopyOutlined, ImageOutlined, UploadFile } from '@mui/icons-material'

const checks = [
  'Upload an empty template first to define field positions',
  'Then upload the filled form to align and extract data',
  'Validate fields and send low-confidence values to review',
]

export default function UploadDocumentPage() {
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
                  <Button variant="contained" color="secondary" startIcon={<UploadFile />}>
                    Select Filled Form
                  </Button>
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
      </Grid>
    </Box>
  )
}
