import { Card, CardContent, Typography } from '@mui/material'

export default function DocumentsPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Documents
      </Typography>

      <Card>
        <CardContent>
          <Typography color="text.secondary">Document list and upload flow will be implemented here.</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
