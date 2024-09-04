import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DutyForm from './components/DutyForm';
import DutyList from './components/DutyList';
import { useDuties } from './hooks/useDuties';

const App: React.FC = () => {
  const { duties, error, addDuty, updateDuty, deleteDuty } = useDuties();

  return (
    <div className="container mt-5">
      <h1>My Todo App</h1>
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <DutyForm onSubmit={addDuty} />
      <DutyList duties={duties} onUpdate={updateDuty} onDelete={deleteDuty}/>
    </div>
  );
}

export default App;
