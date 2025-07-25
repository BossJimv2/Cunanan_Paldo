import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Orders = () => {

  return (
    <>
    <h1>Orders</h1>
    <Box sx={{mt:2}}>
        <Outlet />
    </Box>
    </>
  )
}

export default observer(Orders)