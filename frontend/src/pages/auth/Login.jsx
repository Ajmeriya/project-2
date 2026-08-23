import { Button, Card, CardContent, Container, Divider, Link, TextField, Typography, Stack, Box } from '@mui/material'
import { ArrowForward, LockOpenOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/documents', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
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
            <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth margin="normal" required />
            <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth margin="normal" required />

            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
              <Link href="#" underline="hover" variant="body2">
                Forgot password?
              </Link>
            </Stack>

            <Button type="submit" variant="contained" fullWidth size="large" endIcon={<ArrowForward />} sx={{ mt: 1 }} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
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
