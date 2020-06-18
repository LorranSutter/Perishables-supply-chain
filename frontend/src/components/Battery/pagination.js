import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import styles from './styles.module.css';

const Pagination = (props) => {

    function handleFirst() {
        props.handlePagination('first');
    }

    function handleClickLeft() {
        props.handlePagination(-1);
    }

    function handleClickRight() {
        props.handlePagination(1);
    }

    function handleLast() {
        props.handlePagination('last');
    }

    return (
        <div className={styles.pagination_arrows}>
            <button onClick={handleFirst}>
                <FiChevronsLeft size={25} />
            </button>
            <button onClick={handleClickLeft}>
                <FiChevronLeft size={25} />
            </button>
            <button onClick={handleClickRight}>
                <FiChevronRight size={25} />
            </button>
            <button onClick={handleLast}>
                <FiChevronsRight size={25} />
            </button>
        </div>
    );
}

export default Pagination;