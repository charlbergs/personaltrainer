import { useState } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTraining(props) { // props: addTraining & row data (params.data)
    // state for training
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.params.links[0].href
    });

    // dialog visibility
    const [open, setOpen] = useState(false);
    
    // clicking the button to open dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // clicking cancel on dialog
    const handleClose = () => {
        setOpen(false);
    };

    // clicking save on dialog
    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };

    // returns the add training button and the new training form
    return(
        <div>
            <Button startIcon={<AddIcon/>} variant="outlined" size='small' onClick={handleClickOpen}>
                Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training for {props.params.firstname} {props.params.lastname}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={training.date}
                            onChange={(dateValue) => setTraining({...training, date: dateValue})}
                            format='DD.MM.YYYY HH:mm'
                            ampm={false}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin='dense'
                        label='Duration (mins)'
                        value={training.duration}
                        type='number'
                        onChange={(event) => setTraining({...training, duration: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Activity'
                        value={training.activity}
                        onChange={(event) => setTraining({...training, activity: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}