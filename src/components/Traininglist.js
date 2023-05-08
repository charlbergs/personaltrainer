import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import CsvExport from './CsvExport';
import { API_URL_getTrainings } from '../constants';

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
        fetch(API_URL_getTrainings)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    // ref for csv export
    const gridRef = useRef();
    // ag-grid columns
    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, filter: 'agDateColumnFilter', 
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', headerName: 'Duration (mins)', sortable: true, filter: true},
        {field: 'customer', valueGetter: params => { // connect first and last name into one column
                if (params.data.customer != null) {
                    return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
                } else {
                    return 'null'; // if the training does not have a customer, column shows 'null'
                }
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
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`,
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

    // parameters for the exported csv file
    const exportParams = {
        fileName: 'Trainings.csv',
        columnKeys: ['date', 'activity', 'duration', 'customer'] // to skip empty columns (buttons)
    };

    // returns the download button and the ag-grid with training data
    return(
        <div>
            <div className='control-panel'>
                <CsvExport gridRef={gridRef} exportParams={exportParams}/>
            </div>
            <div className='ag-theme-material' style={{height: 600, width: '63%', margin: 'auto'}}>
                <AgGridReact 
                    ref={gridRef}
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