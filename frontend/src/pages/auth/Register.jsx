import { Button, Card, CardContent, Container, Divider, Link, TextField, Typography, Box, Stack } from '@mui/material'
import { ArrowForward, PersonAddAltOutlined } from '@mui/icons-material'

export default function RegisterPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: 'secondary.main', color: 'common.white' }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <PersonAddAltOutlined />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Create your account
            </Typography>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 800 }}>
            Start processing forms
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up your team workspace for intelligent document processing.
          </Typography>

          <form>
            <TextField label="Full name" fullWidth margin="normal" />
            <TextField label="Email" type="email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <TextField label="Confirm password" type="password" fullWidth margin="normal" />

            <Button variant="contained" fullWidth size="large" endIcon={<ArrowForward />} sx={{ mt: 2 }}>
              Register
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
