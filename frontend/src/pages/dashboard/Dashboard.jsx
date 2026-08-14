import { Card, CardContent, Grid, Typography } from '@mui/material'

const stats = [
  { label: 'Total Templates', value: '12' },
  { label: 'Total Documents', value: '248' },
  { label: 'Processed Documents', value: '221' },
  { label: 'Pending Review', value: '27' },
]

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Recent Documents
          </Typography>
          <Typography color="text.secondary">Recent processing activity will appear here.</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
