import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { ArrowForward, Description, FolderOpen } from '@mui/icons-material'

export default function DashboardPage() {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
        Overview
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Document form workflow
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <FolderOpen color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Empty forms
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload a blank form and define the locations of fields like Name, DOB, Address, and Phone.
              </Typography>
              <Button variant="contained" endIcon={<ArrowForward />}>
                Upload Empty Form
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Description color="secondary" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Filled forms
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload the completed form to match it with the template and extract values into the system.
              </Typography>
              <Button variant="outlined" endIcon={<ArrowForward />}>
                Upload Filled Form
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
