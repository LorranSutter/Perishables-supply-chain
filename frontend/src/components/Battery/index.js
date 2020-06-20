import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTrack from './historyTrack';

const Battery = () => {

    const [track, setTrack] = useState(null);

    const [id, setId] = useState('');
    const [thermal, setThermal] = useState("");
    const [location, setLocation] = useState("");
    const [currentOwner, setCurrentOwner] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {
        if (!cookies.id) {
            history.push('/wrong', { message: 'Id Battery' });
            return function cleanup() { }
        }
        setId(cookies.id);

        try {
            api
            .get(`getBatteryTrackingInfo`)
            .then(res => {
                if (res.status === 200) {
                    setThermal(res.data.battery.thermal)
                    setLocation(res.data.battery.location);
                    setCurrentOwner(res.battery.owner);                  
                } else {
                    history.push('/wrong');
                    return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/wrong', { 'message': err });
                return function cleanup() { }
            });
        } catch (error) {
            alert('Fail.');
        }
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