import { Button, Card, CardContent, Typography } from '@mui/material'

export default function TemplatesPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Templates
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }}>
        Create Template
      </Button>

      <Card>
        <CardContent>
          <Typography color="text.secondary">Template listing will be implemented here.</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
