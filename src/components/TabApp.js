import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import TrainingsCalendar from './TrainingsCalendar';

export default function TabApp() {
    // state for setting the value (to switch tabs)
    const [value, setValue] = useState('home');

    // clicking a tab changes the value
    const handleChange = (event, value) => {
        setValue(value)
    };

    // a different component is rendered depending on which value is set
    return(
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value='home' label='Home'/>
                <Tab value='customers' label='Customers'/>
                <Tab value='trainings' label='Trainings'/>
                <Tab value='calendar' label='Calendar'/>
            </Tabs>
            {value === 'home' && <div><p>Welcome to the Personal Trainer App!</p></div>}
            {value === 'customers' && <div><Customerlist /></div>}
            {value === 'trainings' && <div><Traininglist /></div>}
            {value === 'calendar' && <div><TrainingsCalendar /></div>}
        </div>
    );
}