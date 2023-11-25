import './App.css';
import { Form } from './components/FORM/index';
import Table from './components/Table/table';
import React, { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User management</h1>
      </header>

      <button onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>

      {showForm && <Form />}

      <Table />
    </div>
  );
}

export default App;
