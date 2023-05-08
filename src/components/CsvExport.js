import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function CsvExport(props){ // props: gridRef, exportParams

    // clicking download exports the data as a csv file
    const handleClickDownload = useCallback(() => {
        props.gridRef.current.api.exportDataAsCsv(props.exportParams);
    }, []);

    // returns the download button
    return(
        <Button startIcon={<DownloadIcon/>} variant='outlined' style={{margin: '5px'}} onClick={handleClickDownload}>Download CSV</Button>
    );

}