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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const [currentRequest, setCurrentRequest] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('Requests before any filters:', requests);

    let result = requests;

    // Фильтрация по термину поиска
    try {
        result = result.filter(request =>
            (request.clientName && request.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (request.carrier && request.carrier.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (request.atiCode && request.atiCode.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    } catch (error) {
        console.error('Ошибка фильтрации: ', error);
    }

    console.log('Requests after search filter:', result);

    // Фильтрация для показа или скрытия завершенных заявок
    if (!showCompleted) {
        result = result.filter(request => request.status !== 'complete');
    }

    console.log('Requests after completion filter:', result);

    // Сортировка
    if (sortConfig.key !== null) {
        result = result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    console.log('Requests after sort:', result);

    setFilteredRequests(result);
  }, [requests, sortConfig, showCompleted, searchTerm]);


  
  

  const sortRequests = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  
    setFilteredRequests(currentRequests => {
      return [...currentRequests].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    });
  };

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
    const handleShowCompletedChange = () => {
      setShowCompleted(!showCompleted);
      console.log('Show Completed:', !showCompleted);
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
          onChange={handleShowCompletedChange}
        />
      </label>
  
      <div>
        Сортировать по:
        <button onClick={() => sortRequests('date')}>Дата</button>
        <button onClick={() => sortRequests('clientName')}>Клиент</button>
      </div>
  
      <Table 
        requests={filteredRequests} 
        editRequest={editRequest} 
        deleteRequest={deleteRequest} 
        isAdmin={isAdmin} 
      />
  
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
