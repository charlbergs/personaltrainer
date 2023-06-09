import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { API_URL_getTrainings } from '../constants';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingsCalendar() {

    // state for trainings
    const [trainings, setTrainings] = useState([]);

    // trainings are fetched on render
    useEffect(() => {
        getTrainings();
    }, []);

    // fetch all trainings
    const getTrainings = () => {
        fetch(API_URL_getTrainings)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    // dayjs localizer for big calendar
    const localizer = dayjsLocalizer(dayjs);

    // turn trainings into calendar events
    const events = trainings.map((training) => {
        return {
            id: training.id,
            title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
            start: new Date(training.date),
            end: (dayjs(training.date).add(training.duration, 'm')).toDate() // minutes from duration are added to the start time
        }
    });

    // returns big-calendar with training data
    return(
        <div className='big-calendar'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                popup
            />
        </div>
    );
}