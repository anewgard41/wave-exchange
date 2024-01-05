import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { SongList } from './SongList';

export function LyricSearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { search } = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(search);
        const lyricText = params.get('lyricText');
        if (lyricText) {
            setSearchTerm(lyricText);
            setQuery(lyricText);
        }
    }, [search]);
    useEffect(() => {
        if (!query)
            return;
        handleSearch()
    }, [query])

    const handleSearch = async () => {
        try {
            const results = await axios.get(`/api/search?lyricText=${encodeURIComponent(query)}`);
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
            <button onClick={() => navigate(`?lyricText=${searchTerm}`)}>Search</button>
            <div>
                <h2>Search Results</h2>
                <SongList searchResults={searchResults} />
            </div>
        </div>
    );
}

