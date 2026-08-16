import { Button, Card, CardContent, Container, Divider, Link, TextField, Typography, Stack, Box } from '@mui/material'
import { ArrowForward, LockOpenOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    navigate('/documents')
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'common.white' }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <LockOpenOutlined />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              IDP Suite
            </Typography>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 800 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue processing forms and reviewing extracted data.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField label="Email" type="email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
              <Link href="#" underline="hover" variant="body2">
                Forgot password?
              </Link>
            </Stack>

            <Button type="submit" variant="contained" fullWidth size="large" endIcon={<ArrowForward />} sx={{ mt: 1 }}>
              Login
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" color="text.secondary">
            Need an account?{' '}
            <Link href="/register" underline="hover">
              Create one
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
