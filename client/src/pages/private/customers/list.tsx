import React, { useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useStore } from '../../../store/rootStore';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerList = () => {

    const { rootStore: { customerStore } } = useStore()

    const initTable = async () => {
        try {
            const resData = await customerStore.fetchList()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        initTable()
    }, []);


    return (
        <div style={{ height: 600, width: '120%', marginLeft: '-10%' }}>
            <Button variant="contained" sx={{ mb: 2 }} component={Link} to="create">Create</Button>
            <DataGrid
            rows={customerStore.rowData}
            columns={customerStore.columns}
            initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            sx={{
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                fontSize: '1.2rem',
                },
            }}
            />
        </div>
    );
}


export default observer(CustomerList) 