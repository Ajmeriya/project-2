import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { Dashboard, Description, Folder, Menu, Settings, TaskAlt, Logout } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: Dashboard },
  { label: 'Templates', to: '/templates', icon: Folder },
  { label: 'Documents', to: '/documents', icon: Description },
  { label: 'Review Queue', to: '/review/1', icon: TaskAlt },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function SidebarContent({ onClose }) {
  return (
    <Box sx={{ width: 250, height: '100%', bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          IDP Suite
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(({ label, to, icon: Icon }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton
              component={NavLink}
              to={to}
              onClick={onClose}
              sx={{
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  )
}

export default function AppLayout() {
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawer = useMemo(
    () => <SidebarContent onClose={() => setMobileOpen(false)} />,
    [],
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />

      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: 250 } }}
        >
          {drawer}
        </Drawer>
      )}

      {isDesktop && (
        <Box
          component="nav"
          sx={{
            width: 260,
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          {drawer}
        </Box>
      )}

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" color="transparent" sx={{ backdropFilter: 'blur(8px)', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
            {!isDesktop && (
              <IconButton edge="start" color="inherit" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
                <Menu />
              </IconButton>
            )}

            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Document Processing
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Ops Team
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
