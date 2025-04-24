import React, { useEffect, useState } from 'react';
import api from '../api.js';

export default function AnimalList() {
    const [dogs, setDogs] = useState([]);
    const [monkeys, setMonkeys] = useState([]);

    useEffect(() => {
        api.get('dogs')
            .then((res) => setDogs(res.data))
            .catch((err) => console.error('Error fetching dogs:', err));

        api.get('monkeys')
            .then((res) => setMonkeys(res.data))
            .catch((err) => console.error('Error fetching monkeys:', err));
    }, []);

    return (
        <div>
            <h2>All Dogs</h2>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog._id}>
                        {dog.name} – {dog.breed} – {dog.trainingStatus}
                    </li>
                ))}
            </ul>

            <h2>All Monkeys</h2>
            <ul>
                {monkeys.map((monkey) => (
                    <li key={monkey._id}>
                        {monkey.name} – {monkey.species} – {monkey.trainingStatus}
                    </li>
                ))}
            </ul>
        </div>
    );
}