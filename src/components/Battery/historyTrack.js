import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css';

import Track from './track';

const HistoryTrack = () => {
    const [historyTrack, setHistoryTrack] = useState([]);

    const history = useHistory()

    useEffect(() => {
        getData();
    }, );
    //     }, [selectedSerial, selectedHolder]);

    function getData() {
        try {
            api
                .get(`/track`,
                    {
                        params: {
                       
                        },
                     
                    })
                .then(res => {
                    if (res.status === 200) {
                        setHistoryTrack(res.data.historyTrack);
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
            alert('Fail to request! Try again.');
        }
    }

    return (
        <main className={styles.history_container}>
            <div id="history-container">
                <Track historyTrack={historyTrack}></Track>
            </div>
        </main>
    );
}

export default HistoryTrack;