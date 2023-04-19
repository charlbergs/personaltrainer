import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, filter: 'agDateColumnFilter', 
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY')
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', headerName: 'Duration (mins)', sortable: true, filter: true},
        {field: 'customer', valueGetter(params) {
                return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            }, sortable: true, filter: true}
    ]);

    return(
        <div>
            <div className='ag-theme-material' style={{height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={trainings} 
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    );
}