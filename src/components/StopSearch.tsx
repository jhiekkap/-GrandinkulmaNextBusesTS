import React, { useState } from 'react'; 

interface StopSearchProps { 
    setStopName: (stop: string) => void;
    getStopsByName : (name: string) => void;
}

const StopSearch: React.FC<StopSearchProps> = ({setStopName, getStopsByName  }) => {

    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('STOP', name);
        getStopsByName (name);
        setStopName(name);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Kokeile toista pysäkkiä:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type='submit'>Lähetä</button>
        </form>
    )
}

export default StopSearch;