import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Traininglist() {
    // state for trainings
    const [trainings, setTrainings] = useState([]);
    
    // snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // trainings are fetched on render
    useEffect(() => getTrainings(), []);

    // fetch all trainings
    const getTrainings = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    // ag-grid columns
    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, filter: 'agDateColumnFilter', 
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', headerName: 'Duration (mins)', sortable: true, filter: true},
        {field: 'customer', valueGetter(params) {
                return `${params.data.customer.firstname} ${params.data.customer.lastname}`; // connect first and last name into one column
            }, sortable: true, filter: true},
        {cellRenderer: params => 
            <Button startIcon={<DeleteIcon/>} variant='outlined' size='small' color='error' onClick={() => deleteTraining(params)}>
                Delete
            </Button>,
            width: 145
        }
    ]);

    // delete training
    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch(`http://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`,
                {method: 'DELETE'}
            )
            .then(response => {
                if (response.ok) {
                    setMsg('Training deleted successfully.');
                    setOpen(true);
                    getTrainings();
                } else {
                    alert('Something went wrong with deletion: ' + response.status);
                }  
            })
            .catch(err => console.error(err));
        }
    }

    return(
        <div>
            <div className='ag-theme-material' style={{height: 600, width: '63%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={trainings} 
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
    );
}