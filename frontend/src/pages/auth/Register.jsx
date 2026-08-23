import { Button, Card, CardContent, Container, Divider, Link, TextField, Typography, Box, Stack } from '@mui/material'
import { ArrowForward, PersonAddAltOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const handleRegister = async (event) => {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setIsSubmitting(true)
    try {
      await register(form.fullName, form.email, form.password)
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

          <form onSubmit={handleRegister}>
            <TextField label="Full name" value={form.fullName} onChange={updateField('fullName')} fullWidth margin="normal" required />
            <TextField label="Email" type="email" value={form.email} onChange={updateField('email')} fullWidth margin="normal" required />
            <TextField label="Password" type="password" value={form.password} onChange={updateField('password')} fullWidth margin="normal" required />
            <TextField label="Confirm password" type="password" value={form.confirmPassword} onChange={updateField('confirmPassword')} fullWidth margin="normal" required />

            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}

            <Button type="submit" variant="contained" fullWidth size="large" endIcon={<ArrowForward />} sx={{ mt: 2 }} disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
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
