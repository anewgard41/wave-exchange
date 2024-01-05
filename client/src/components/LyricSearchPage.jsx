import React, { useState } from 'react';
import axios from 'axios';
import { SongList } from './SongList';

export function LyricSearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const results = await axios.get(`/api/search?lyricText=${encodeURIComponent(searchTerm)}`);
            setSearchResults(results.data);
        } catch (error) {
            console.error('Error searching from server:', error);
        }
    };

    return (
        <div className="App">
            <h1>Lyric Search</h1>
            <input
                type="text"
                placeholder="Enter search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                <h2>Search Results</h2>
                <SongList searchResults={searchResults} />
            </div>
        </div>
    );
}

