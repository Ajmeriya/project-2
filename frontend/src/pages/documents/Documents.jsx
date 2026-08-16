import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Add, FilePresent, FilterList, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const documents = [
  { id: 'DOC-1048', form: 'Bank KYC', customer: 'Aditi Sharma', status: 'Validated', confidence: '96%', time: '08:15 AM' },
  { id: 'DOC-1049', form: 'Insurance Claim', customer: 'Rahul Mehta', status: 'Needs Review', confidence: '78%', time: '09:42 AM' },
  { id: 'DOC-1050', form: 'Hospital Intake', customer: 'Sonia Verma', status: 'Processing', confidence: '91%', time: '10:27 AM' },
  { id: 'DOC-1051', form: 'Government ID', customer: 'Nitin Joshi', status: 'Validated', confidence: '98%', time: '11:05 AM' },
  { id: 'DOC-1052', form: 'Bank Branch Form', customer: 'Priya Shah', status: 'Queued', confidence: '84%', time: '11:35 AM' },
]

export default function DocumentsPage() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
            Document Queue
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Document Processing Hub
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<FilterList />}>
            Filters
          </Button>
          <Button component={Link} to="/documents/upload" variant="contained" startIcon={<Add />}>
            New Upload
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary">Scanned Today</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>86</Typography>
                </Box>
                <FilePresent color="primary" sx={{ fontSize: 34 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary">Auto Validated</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>72</Typography>
                </Box>
                <Search color="success" sx={{ fontSize: 34 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary">High Risk</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>9</Typography>
                </Box>
                <FilterList color="warning" sx={{ fontSize: 34 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{document.id}</Typography>
                      <Typography variant="caption" color="text.secondary">{document.form}</Typography>
                    </TableCell>
                    <TableCell>{document.customer}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={document.status}
                        color={document.status === 'Validated' ? 'success' : document.status === 'Needs Review' ? 'warning' : document.status === 'Queued' ? 'info' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>{document.confidence}</TableCell>
                    <TableCell>{document.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}
