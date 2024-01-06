import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Space } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { SongList } from './SongList';
const { Search } = Input;

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
            <Space.Compact
                style={{
                    width: '100%',
                    maxWidth: '300px',
                }}>
                <Input defaultValue="Enter search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
            <button type="primary" onClick={() => navigate(`?lyricText=${searchTerm}`)}>Search</button>
            </Space.Compact>
            <div>
                <h2>Search Results</h2>
                <SongList searchResults={searchResults} />
            </div>
        </div>
    );
}

