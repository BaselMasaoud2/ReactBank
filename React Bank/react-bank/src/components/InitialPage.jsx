import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style.css';

export default function InitialPage() {
  return (
    <ul>
      <li><Link to="/transactions" className={styles.active}>Transactions</Link></li>
      <li><Link to="/operations">Operations</Link></li>
      <li><Link to="/breakdown">Breakdown</Link></li>
    </ul>
  );
}



