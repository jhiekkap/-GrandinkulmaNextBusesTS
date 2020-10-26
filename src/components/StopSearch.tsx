import React, { useState } from 'react';

interface StopSearchProps {
    setChosenStopName: (chosenStop: string) => void;
    getStops: (name: string) => void;
}

const StopSearch: React.FC<StopSearchProps> = ({ setChosenStopName, getStops }) => {

    const [stop, setStop] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('STOP', stop);
        getStops(stop);
        setChosenStopName(stop);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Kokeile toista pysäkkiä:
                <input
                    type="text"
                    value={stop}
                    onChange={(e) => setStop(e.target.value)}
                />
            </label>
            <button type='submit'>Lähetä</button>
        </form>
    )
}

export default StopSearch;