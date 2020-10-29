import React, { useState } from 'react';
import { useStateValue, setStopName } from "../state";

const StopSearch: React.FC = () => {

    const [, dispatch] = useStateValue();
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (name) {
            console.log('STOP', name);
            dispatch(setStopName(name));
            setTimeout(() => setName(''), 5000);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Hae pysäkkiä:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type='submit'>Lähetä</button>
        </form>
    );
}

export default StopSearch;