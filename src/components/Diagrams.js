import { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie } from 'recharts';
import _ from 'lodash';

export default function Diagrams() {
    // state for trainings
    const [trainings, setTrainings] = useState([]);

    // trainings are fetched on render
    useEffect(() => {
        getTrainings();
    }, []);

    // fetch all trainings
    const getTrainings = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    // presents the trainings in a single array by activity and counts the total durations 
    const totalTimeByActivity = _(trainings)
        .groupBy('activity')
        .map((training, activity) => ({
            name: activity,
            minutes: _.sumBy(training, 'duration')
        })).value()

    return(
        <div className='diagrams'>
            <div>
            <h5 className='diagram-h'>Sum of Durations by Activity</h5>
            <BarChart
                width={600}
                height={300}
                data={totalTimeByActivity}
            >
                <XAxis dataKey='name' name='training'/>
                <YAxis 
                    label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip/>
                <Bar dataKey='minutes' fill='#5c9ed1'/>
            </BarChart>
            </div>
            <div>
            <h5 className='diagram-h'>Activities by Total Amount of Time</h5>
            <PieChart width={500} height={300}>
                <Pie
                    dataKey='minutes'
                    data={totalTimeByActivity}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    fill='#5c9ed1'
                    label={(activity) => activity.name}
                />
                <Tooltip />
            </PieChart>
            </div>
        </div>
    )
}