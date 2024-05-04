import React, { useState, useEffect } from 'react';
import RequestCount from './components/RequestCount';
import Table from './components/Table';
import RequestForm from './components/RequestForm';
import AdminPanel from './components/AdminPanel';

function App() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setFilteredRequests(
      requests.filter(request =>
        (showCompleted || request.status !== 'completed') &&
        (request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.carrierName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [requests, showCompleted, searchTerm]);

  const [currentRequest, setCurrentRequest] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const editRequest = (id) => {
    // Находим и устанавливаем текущий запрос для редактирования
    const request = requests.find(request => request.id === id);
    setCurrentRequest(request);
  };

  const deleteRequest = (id) => {
    // Обновляем список запросов, исключая удаленный
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleSubmit = (formData) => {
    if (formData.id) {
      // Обновление существующего запроса
      setRequests(requests.map(request => (request.id === formData.id ? formData : request)));
    } else {
      // Добавление нового запроса
      setRequests([...requests, { ...formData, id: Math.random() }]); // Присвоение уникального ID для примера
    }
    setCurrentRequest({}); // Очистка формы
  };


  return (
    <div className="App">
      <RequestCount count={filteredRequests.length} />
      <input
        type="text"
        placeholder="Поиск по клиенту или перевозчику"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <label>
        Показать завершенные:
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
      </label>
      <Table requests={filteredRequests} editRequest={editRequest} deleteRequest={deleteRequest} isAdmin={isAdmin} />
      {isAdmin && (
        <>
          <RequestForm onSubmit={handleSubmit} initialData={currentRequest} />
          <AdminPanel />
        </>
      )}
      <button onClick={() => setIsAdmin(!isAdmin)}>{isAdmin ? 'Выход из режима администратора' : 'Перейти в режим администратора'}</button>
    </div>
  );
}

export default App;
