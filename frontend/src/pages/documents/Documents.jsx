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
import { useEffect, useState } from 'react'
import { documentApi } from '../../api/documentApi'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    documentApi.list()
      .then(setDocuments)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false))
  }, [])

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
          {isLoading && <Typography sx={{ p: 3 }} color="text.secondary">Loading documents...</Typography>}
          {error && <Typography sx={{ p: 3 }} color="error">{error}</Typography>}
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
                {!isLoading && !error && documents.map((document) => (
                  <TableRow key={document.id} hover component={Link} to={`/documents/${document.id}`} sx={{ textDecoration: 'none' }}>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{document.id}</Typography>
                      <Typography variant="caption" color="text.secondary">{document.formName}</Typography>
                    </TableCell>
                    <TableCell>{document.customer}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={document.status}
                        color={document.status === 'Validated' ? 'success' : document.status === 'Needs Review' ? 'warning' : document.status === 'Queued' ? 'info' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>{document.confidence}%</TableCell>
                    <TableCell>{new Date(document.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  </TableRow>
                ))}
                {!isLoading && !error && documents.length === 0 && <TableRow><TableCell colSpan={5}>No documents uploaded yet.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}
