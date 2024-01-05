import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/search', { searchQuery: searchTerm });
            setSearchResults(response.data.hits);
        } catch (error) {
            console.error('Error searching from server:', error);
        }
    };

    return (
        <div className="App">
            <h1>Genius Song Search</h1>
            <input
                type="text"
                placeholder="Enter search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                <h2>Search Results</h2>
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.result.id}>{result.result.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
