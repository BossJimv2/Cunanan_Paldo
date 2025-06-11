import { observer } from 'mobx-react-lite';
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useStore } from '../../../store/rootStore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Dashboard = () => {
  const { rootStore: { productStore, customerStore, orderStore } } = useStore();

  const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        background: '#111',
        borderRadius: '15px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease',
        boxShadow: '0 2px 8px rgba(0,255,255,0.08)',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 20px rgba(0,255,255,0.5)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(0deg, transparent, transparent 30%, rgba(0,255,255,0.3))',
          transform: 'rotate(-45deg)',
          transition: 'all 0.5s ease',
          opacity: 0,
          zIndex: 1,
        },
        '&:hover::before': {
          opacity: 1,
          transform: 'rotate(-45deg) translateY(100%)',
        },
      }}
      elevation={0}
    >
      <Box sx={{ mr: 2, color: '#0ff', zIndex: 2 }}>
        {icon}
      </Box>
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h6" sx={{ color: '#0ff', fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#000000', fontWeight: 600 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Products"
            value={productStore.rowData.length}
            icon={<StorefrontIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Customers"
            value={customerStore.rowData.length}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Orders"
            value={orderStore.rowData.length}
            icon={<ReceiptIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(Dashboard);
