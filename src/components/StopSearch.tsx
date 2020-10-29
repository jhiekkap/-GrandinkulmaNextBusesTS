import React, { useState } from 'react';

interface StopSearchProps {
    setStopName: (stop: string) => void;
}

const StopSearch: React.FC<StopSearchProps> = ({ setStopName }) => {

    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (name) {
            console.log('STOP', name); 
            setStopName(name);
            setTimeout(() => setName(''), 3000);
        }
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