import React, { useState } from 'react'; 

interface StopSearchProps { 
    setStop: (stop: string) => void;
    getStops: (name: string) => void;
}

const StopSearch: React.FC<StopSearchProps> = ({setStop, getStops }) => {

    const [stopName, setStopName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('STOP', stopName);
        getStops(stopName);
        setStop(stopName);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Kokeile toista pysäkkiä:
                <input
                    type="text"
                    value={stopName}
                    onChange={(e) => setStopName(e.target.value)}
                />
            </label>
            <button type='submit'>Lähetä</button>
        </form>
    )
}

export default StopSearch;