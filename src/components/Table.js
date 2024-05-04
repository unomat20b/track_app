import React from 'react';

function Table({ requests, editRequest, deleteRequest }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Дата</th>
          <th>Клиент</th>
          <th>Перевозчик</th>
          <th>Телефон</th>
          <th>Комментарии</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.date}</td>
            <td>{request.clientName}</td>
            <td>{request.carrierName}</td>
            <td>{request.carrierPhone}</td>
            <td>{request.comments}</td>
            <td>{request.status}</td>
            <td>
              <button onClick={() => editRequest(request.id)}>Редактировать</button>
              <button onClick={() => deleteRequest(request.id)} style={{marginLeft: '10px'}}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default Table;
