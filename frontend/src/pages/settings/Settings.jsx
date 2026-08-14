import { Card, CardContent, Typography } from '@mui/material'

export default function SettingsPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Settings
      </Typography>

      <Card>
        <CardContent>
          <Typography color="text.secondary">Application settings will be implemented here.</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
