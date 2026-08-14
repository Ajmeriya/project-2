import { Card, CardContent, Typography } from '@mui/material'

export default function ReviewPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Review Queue
      </Typography>

      <Card>
        <CardContent>
          <Typography color="text.secondary">Human review screen will be implemented here.</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
