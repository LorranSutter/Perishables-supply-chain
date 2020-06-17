import React from 'react';

import styles from './styles.module.css';

const Track = React.memo((props) => {
    return (
        <table className={styles.history_track}>
            <thead>
                <tr>
                    <th id="col-serial">Serial Number</th>
                    <th id="col-holder">Holder</th>
                    <th id="col-location">Location</th>
                    <th id="col-date">Thermal</th>
                </tr>
            </thead>
            <tbody>
                {props.historyTrack.map(elem => (
                    <tr key={elem._id}>
                        <td>{elem.serial}</td>
                        <td>{elem.holder}</td>
                        <td>{elem.location}</td>
                        <td>{elem.thermal}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
})
export default Track;
