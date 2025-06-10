import { action, makeObservable, observable } from "mobx";
import { IRootStore } from "./rootStore";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ListItemButton } from "@mui/material";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default class ProductStore {
    BASE_URL = process.env.REACT_APP_API_URL + '/v1/products'

    rootStore: IRootStore
    rowData: GridRowsProp[] = [];
    products: any[] = []; // <-- ADDED: holds all products for lookups
    columns: GridColDef[];

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;
        this.columns = [
            {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <>
                        <ListItemButton sx={{ width: 0 }} component={Link} to={'edit/' + params.row.id}><EditIcon /></ListItemButton>
                        <ListItemButton onClick={() => this.deleteDialog(params)}><DeleteIcon /></ListItemButton>
                    </>
                ),
            },
            { field: 'id', headerName: 'Id', width: 100 },
            { field: 'name', headerName: 'Product Name', width: 150 },
            { field: 'category', headerName: 'Category', width: 150 },
            { field: 'price', headerName: 'Price', width: 200 },
            { field: 'stock', headerName: 'Stock', width: 200 },
        ];
        makeObservable(this, {
            rowData: observable,
            products: observable,
            columns: observable,
            setRowData: action,
            setProducts: action,
            fetchList: action,
            createData: action,
            getData: action,
            updateData: action,
            initForm: action,
        });
    }

    setRowData(values: GridRowsProp[]) {
        this.rowData = values;
    }

    setProducts = (items: any[]) => {
        this.products = items;
    }

    //   Api Calls
    fetchList = async () => {
        try {
            const response = await fetch(this.BASE_URL + '/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, `HTTP Request failed: ${response.status} ${response.statusText}`, data);
                return Promise.reject(data)
            } else {
                this.setRowData(data.data.products);
                this.setProducts(data.data.products); // Sync products for lookup
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // InitForm
    initForm = async () => {
        try {
            const response = await fetch(this.BASE_URL + '/initForm', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, `HTTP Request failed: ${response.status} ${response.statusText}`, data);
                return Promise.reject(data)
            } else {
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // Create
    createData = async (postData: any) => {
        try {
            const response = await fetch(this.BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json', // Ensure JSON header
                },
                body: JSON.stringify(postData) // Ensure payload is stringified
            });

            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, data.message, data);
                return Promise.reject(data)
            } else {
                this.rootStore.alertStore.open({status: "success", message: data.message})
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // View
    getData = async (id: number | string) => {
        try {
            const response = await fetch(this.BASE_URL + `/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, data.message, data);
                return Promise.reject(data)
            } else {
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // Update
    updateData = async (id: number | string, postData: any) => {
        try {
            const response = await fetch(this.BASE_URL + `/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json', // Ensure JSON header
                },
                body: JSON.stringify(postData) // Ensure payload is stringified
            })

            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status,  data.message, data);
                return Promise.reject(data)
            } else {
                this.rootStore.alertStore.open({status: "success", message: data.message})
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // Delete
    deleteData = async (id: number | string) => {
        try {
            const response = await fetch(this.BASE_URL + `/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, data.message, data);
                return Promise.reject(data)
            } else {
                this.setRowData(this.rowData.filter((e:any) => e.id != id))
                this.rootStore.alertStore.open({status: "success", message: data.message})
                return Promise.resolve(data)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }

    // Show delete dialog
    deleteDialog = (params: any) => {
        this.rootStore.dialogStore.openDialog({
            confirmFn: () => this.deleteData(params.row.id),
            dialogText: "Are you sure you want to delete this item ?"
        })
    }

    //   Api Calls
    getList = async (postData:any) => {
        try {
            const response = await fetch(this.BASE_URL + '/getList', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.rootStore.authStore.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            })
            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, `HTTP Request failed: ${response.status} ${response.statusText}`, data);
                return Promise.reject(data)
            } else {
                this.setProducts(data.data.products); // Sync products for lookups
                return Promise.resolve(data.data.products)
            }
        } catch (error: any) {
            this.rootStore.handleError(419, "Something went wrong!", error)
        }
    }
}