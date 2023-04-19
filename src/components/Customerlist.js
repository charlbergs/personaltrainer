import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true},
        {field: 'streetaddress', headerName: 'Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Postal Code', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
    ]);

    return(
        <div>
            <div className='ag-theme-material' style={{height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={customers} 
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    )
}