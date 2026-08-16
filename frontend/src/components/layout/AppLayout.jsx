import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {
  Description,
  Folder,
  Menu,
  Settings,
  Logout,
} from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Templates', to: '/templates', icon: Folder },
  { label: 'Documents', to: '/documents', icon: Description },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function SidebarContent({ onClose }) {
  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar sx={{ px: 2.5, py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 0.5,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'common.white',
              fontWeight: 800,
              bgcolor: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
              background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
            }}
          >
            ID
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              IDP Suite
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Document Ops
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 1 }}>
        {navItems.map(({ label, to, icon: Icon }) => (
          <ListItem key={to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={to}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                px: 1.5,
                py: 1,
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: '0 10px 24px rgba(37, 99, 235, 0.18)',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                },
              }}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Logout />}
          sx={{ justifyContent: 'flex-start', borderRadius: 2 }}
        >
          Logout
        </Button>
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
        <AppBar
          position="sticky"
          color="transparent"
          sx={{
            backdropFilter: 'blur(14px)',
            background: 'rgba(244, 247, 251, 0.8)',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
            {!isDesktop && (
              <IconButton edge="start" color="inherit" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
                <Menu />
              </IconButton>
            )}

            <Box />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Ops Team
              </Typography>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 13, fontWeight: 700 }}>
                OA
              </Avatar>
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
