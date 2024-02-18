import './App.css';
import './Transactions.css';
import './style.css';
import './OperationsPage.css';
import './BreakdownPage.css';
import Transactions from './components/Transactions';
import InitialPage from './components/InitialPage';
import OperationsPage from './components/OperationsPage';
import BreakdownPage from './components/BreakdownPage';
import Header from './components/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/breakdown" element={<BreakdownPage />} />
          <Route path="/" element={<Transactions />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
