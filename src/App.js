import React, { useState, useEffect } from 'react';
import RequestCount from './components/RequestCount';
import Table from './components/Table';
import RequestForm from './components/RequestForm';
import AdminPanel from './components/AdminPanel';
import styles from './App.module.css'; // CSS-модули


function App() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const [currentRequest, setCurrentRequest] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let result = requests;
  
    // Filter by search term
    result = result.filter(request =>
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.atiCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Filter to either show or hide completed requests
    if (!showCompleted) {
      result = result.filter(request => request.status !== 'completed');
    }
  
    // Sort, if necessary
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

  return (
        <div className="App">
            <div className={styles.adminControls}>
                <button
                    className={styles.adminButton}
                    onClick={() => setIsAdmin(!isAdmin)}
                >
                    {isAdmin ? 'Выход из режима администратора' : 'Перейти в режим администратора'}
                </button>

                <div className={styles.searchAndFilter}>
                    <RequestCount count={filteredRequests.length} />

                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Поиск по клиенту или перевозчику"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />

                    <div className={styles.checkboxControl}>
                      <label>
                        Показать завершенные:
                        <input
                          type="checkbox"
                          checked={showCompleted}
                          onChange={() => setShowCompleted(!showCompleted)}
                        />
                      </label>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <>
                    <AdminPanel />
                    <RequestForm onSubmit={handleSubmit} initialData={currentRequest} />
                </>
            )}

            <Table 
                requests={filteredRequests} 
                editRequest={editRequest} 
                deleteRequest={deleteRequest} 
                sortRequests={sortRequests}
                isAdmin={isAdmin} 
            />
        </div>
    );
}

export default App;
