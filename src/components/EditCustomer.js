import React, { useState } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) { // props: updateCustomer & row data (params.data)
    // state for customer
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    // clears the customer form (after saving or cancelling)
    const clearCustomer = () => setCustomer({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    // dialog visibility
    const [open, setOpen] = useState(false);
    
    // clicking the button to open dialog
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.params.firstname,
            lastname: props.params.lastname,
            streetaddress: props.params.streetaddress,
            postcode: props.params.postcode,
            city: props.params.city,
            email: props.params.email,
            phone: props.params.phone
        });
    };

    // clicking cancel on dialog
    const handleClose = () => {
        setOpen(false);
        // clear the customer state
        clearCustomer();
    };

    // clicking save on dialog
    const handleSave = () => {
        props.updateCustomer(props.params.links[0].href, customer);
        setOpen(false);
        clearCustomer();
    };

    // returns the edit button and the edit customer form
    return(
        <div>
            <Button startIcon={<EditIcon/>} variant='outlined' size='small' color='secondary' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='First name'
                        value={customer.firstname}
                        onChange={(event) => setCustomer({...customer, firstname: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Last name'
                        value={customer.lastname}
                        onChange={(event) => setCustomer({...customer, lastname: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Street address'
                        value={customer.streetaddress}
                        onChange={(event) => setCustomer({...customer, streetaddress: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Postal code'
                        value={customer.postcode}
                        onChange={(event) => setCustomer({...customer, postcode: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='City'
                        value={customer.city}
                        onChange={(event) => setCustomer({...customer, city: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Email'
                        value={customer.email}
                        onChange={(event) => setCustomer({...customer, email: event.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Phone number'
                        value={customer.phone}
                        onChange={(event) => setCustomer({...customer, phone: event.target.value})}
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