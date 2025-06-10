import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { navItems } from '../../config/menu';
import {Outlet, Link} from 'react-router-dom';
import { useStore } from '../../store/rootStore'; 
import { observer } from 'mobx-react-lite';
import { Container } from '@mui/material';
import AppDialog from '../dialog/AppDialog';
import AppAlert from '../alert/AppAlert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
      main: '#FFFFFF', 
    },
    background: {
      default: '#14a3c7', 
      paper: '#A9A9A9', 
    },
    text: {
      primary: '#000000', 
      secondary: '#000000',
    },
  },
});

const BaseLayout = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {rootStore: {authStore}} = useStore();  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logout =async () => {
    try{
        const resData = await authStore.logout()
    }catch(error){
        console.log(error);
    }
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        POS
      </Typography>
      <Divider />
      <List>
      {navItems.map((item) => (
            <ListItemButton key={item.label}  sx={{ textAlign: 'center' }} component={Link} to={item.url}>
              <ListItemText primary={item.label} />
            </ListItemButton>
        ))}

            <ListItemButton sx={{ textAlign: 'center' }} key={'logout'} onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textTransform: 'uppercase' }}
            >
            Book<span style={{color: '#A0410D'}}>Hub</span>
            </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button key={item.label} sx={{ color: '#000', fontWeight: 'bold', backgroundColor: '#14a3c7',
                  '&:hover': {
                  backgroundColor: '#A9A9A9',
                  color: '#000',
                  transform: 'translate(-0.25rem, -0.25rem)',
                  boxShadow: '0.25rem 0.25rem #000',
                  },
                  '&:active': {
                  transform: 'translate(0)',
                  boxShadow: 'none',
                  }, }} component={Link} to={item.url} >
                  {item.label}
                  </Button>
                ))}
                 <Button key={"logout"} sx={{ color: '#000', fontWeight: 'bold', backgroundColor: '#14a3c7',
                 '&:hover': {
                  backgroundColor: '#A9A9A9',
                  color: '#000',
                  transform: 'translate(-0.25rem, -0.25rem)',
                  boxShadow: '0.25rem 0.25rem #000',
                },
                '&:active': {
                  transform: 'translate(0)',
                  boxShadow: 'none',
                }, }} onClick={logout} >
                  Logout
                </Button>
                </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Container maxWidth="lg">
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <AppAlert />
        <Outlet />
        <AppDialog />
      </Box>
      </Container>
    </Box>
    </ThemeProvider>
  );
}

export default observer(BaseLayout)