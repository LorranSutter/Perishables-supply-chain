import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css';

//import Track from './track';
import TrackRimble from './trackRimble';
import Pagination from './pagination';

const HistoryTrack = () => {
    const [historyTrack, setHistoryTrack] = useState([]);
    const [page, setPage] = useState(0);
    const [countResults, setCountResults] = useState(0);

    const history = useHistory()
/* 
   useEffect(() => {
       try {
            api
                .get(`/track?page=${page}`)
                .then(res => {
                    if (res.status === 200) {
                        setCountResults(res.data.countHistoryTrack);
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

    }, [page]); 
*/

    function handlePagination(command) {
        if (command === -1) {
            if (page > 0) {
                setPage(page => page - 1);
            }
        } else if (command === 1) {
            if ((page + 1) * 10 < countResults) {
                setPage(page => page + 1);
            }
        } else if (command === 'first') {
            setPage(0);
        } else if (command === 'last') {
            if (countResults % 10 === 0) {
                setPage(parseInt(countResults / 10) - 1);
            } else {
                setPage(parseInt(countResults / 10));
            }
        }
    }

    return (
        <main className={styles.history_container}>
            <div id="history-container">
                {/* <Track historyTrack={historyTrack}></Track>*/}
                <TrackRimble></TrackRimble>
                <Pagination handlePagination={handlePagination} />
            </div>
        </main>
    );
}

export default HistoryTrack;