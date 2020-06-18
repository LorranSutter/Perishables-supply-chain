import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

import HistoryTrack from './historyTrack';

const Battery = () => {

    const [track, setTrack] = useState(null);

    const history = useHistory();

    useEffect(() => {

        setTrack(<HistoryTrack></HistoryTrack>);

    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";
        document.body.style.margin = "2em 3em";
    }, []);

    function handleClickLogout(e) {
        history.push('/login');
    }

    return (
        <>
            <header className={styles.header_container}>
                <h2>Battery Track</h2>
                <div>
                   <button onClick={handleClickLogout}>Logout</button>
                </div>
            </header>
            {track}
        </>
    );
}

export default Battery;