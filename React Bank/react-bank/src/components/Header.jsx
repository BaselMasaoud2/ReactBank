import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      <li><Link to="/transactions">Transactions</Link></li>
      <li><Link to="/operations">Operations</Link></li>
      <li><Link to="/breakdown">Breakdown</Link></li>
    </ul>
  );
};

export default Header;
