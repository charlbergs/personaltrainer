import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import CsvExport from './CsvExport';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {
    // state for customers
    const [customers, setCustomers] = useState([]);
    
    // snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // customers are fetched on render
    useEffect(() => getCustomers(), []);

    // fetch all customers
    const getCustomers = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    // ref for csv export
    const gridRef = useRef();
    // ag-grid columns
    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 130},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 130},
        {field: 'streetaddress', headerName: 'Address', sortable: true, filter: true, width: 155},
        {field: 'postcode', sortable: true, filter: true, width: 120},
        {field: 'city', sortable: true, filter: true, width: 117},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true, width: 130},
        {cellRenderer: params =>
            <EditCustomer updateCustomer={updateCustomer} params={params.data}/>,
            width: 110
        },
        {cellRenderer: params => 
            <Button startIcon={<DeleteIcon/>} variant='outlined' size='small' color='error' onClick={() => deleteCustomer(params)}>
                Delete
            </Button>,
            width: 145
        },
        {cellRenderer: params =>
            <AddTraining addTraining={addTraining} params={params.data}/>,
            width: 135
        }
    ]);

    // add new customer
    const addCustomer = (customer) => {
        fetch('http://traineeapp.azurewebsites.net/api/customers', { 
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('New customer added.');
                setOpen(true);
                getCustomers();
            } else {
                alert('Something went wrong while adding a new customer: ' + response.status)
            }
        })
        .catch(err => console.error(err));
    };

    // delete customer
    const deleteCustomer = (params) => {
        if (window.confirm(`Are you sure you want to delete customer ${params.data.firstname} ${params.data.lastname}?`)) {
            fetch(params.data.links[0].href, 
                {method: 'DELETE'}
            )
            .then(response => {
                if (response.ok) {
                    setMsg('Customer deleted successfully.');
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong with deletion: ' + response.status);
                }
            })
            .catch(err => console.error(err));
        }
    }

    // edit customer
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer edited successfully.');
                setOpen(true);
                getCustomers();
            }
            else
                alert('Something went wrong with edit: ' + response.status)
        })
        .catch(err => console.error(err));
    };

    // add training
    const addTraining = (training) => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings', { 
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                setMsg('New training added.');
                setOpen(true);
            } else {
                alert('Something went wrong while adding a new training: ' + response.status)
            }
        })
        .catch(err => console.error(err));
    };

    // parameters for the exported csv file
    const exportParams = {
        fileName: 'Customers.csv',
        columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'] // to skip empty columns (buttons)
    };

    return(
        <div>
            <div className='control-panel'>
                <AddCustomer addCustomer={addCustomer}/>
                <CsvExport gridRef={gridRef} exportParams={exportParams}/>
            </div>
            <div className='ag-theme-material' style={{height: 600, width: '91%', margin: 'auto'}}>
                <AgGridReact 
                    ref={gridRef}
                    rowData={customers} 
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </div>
    )
}