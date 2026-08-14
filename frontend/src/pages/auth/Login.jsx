import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Sign in
          </Typography>

          <form>
            <TextField label="Email" type="email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <Button variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
