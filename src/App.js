import React, { useState } from 'react';
import RequestCount from './components/RequestCount';
import Table from './components/Table';
import RequestForm from './components/RequestForm';
import AdminPanel from './components/AdminPanel';

function App() {
    const [requests, setRequests] = useState([
        { id: 1, date: '2020-01-01', clientName: 'Клиент 1', carrierName: 'Перевозчик 1', carrierPhone: '1234567890', comments: 'No comments', status: 'new' },
        { id: 2, date: '2020-01-02', clientName: 'Клиент 2', carrierName: 'Перевозчик 2', carrierPhone: '0987654321', comments: 'Urgent', status: 'inProgress' }
    ]);
    const [currentRequest, setCurrentRequest] = useState({});
    const [mode, setMode] = useState('add');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = (formData) => {
        if (mode === 'edit' && formData.id) {
            setRequests(requests.map(req => req.id === formData.id ? { ...formData } : req));
        } else {
            setRequests([...requests, { ...formData, id: requests.length + 1 }]);
        }
        setCurrentRequest({});
        setMode('add');
    };

    const editRequest = (requestId) => {
        const request = requests.find(req => req.id === requestId);
        setCurrentRequest(request);
        setMode('edit');
    };

    const addNewRequest = () => {
        setCurrentRequest({});
        setMode('add');
    };

    const deleteRequest = (requestId) => {
        setRequests(requests.filter(request => request.id !== requestId));
        setCurrentRequest({});
        setMode('add');
    };

    const toggleAdminMode = () => {
        setIsAdmin(!isAdmin);
    };

    return (
      <div className="App">
          <RequestCount count={requests.length} />
          <Table requests={requests} editRequest={isAdmin ? editRequest : undefined} deleteRequest={isAdmin ? deleteRequest : undefined} isAdmin={isAdmin} />
          {isAdmin && (
              <>
                  <RequestForm onSubmit={handleSubmit} initialData={currentRequest} />
                  <button onClick={addNewRequest}>Добавить новую заявку</button>
                  <AdminPanel />
              </>
          )}
          <button onClick={toggleAdminMode}>{isAdmin ? 'Выход из режима администратора' : 'Перейти в режим администратора'}</button>
      </div>
    );
}

export default App;
