import React from 'react';

function Table({ requests, editRequest, deleteRequest, isAdmin }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Клиент</th>
          <th>Перевозчик</th>
          <th>Телефон</th>
          <th>ATI Код</th>
          <th>Комментарии</th>
          <th>Статус</th>
          {isAdmin && <th>Действия</th>}
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request.id}>
            <td>{request.date}</td>
            <td>{request.clientName}</td>
            <td>{request.carrierName}</td>
            <td>{request.carrierPhone}</td>
            <td><a href={`https://ati.su/firms/${request.atiCode}/info`} target="_blank" rel="noopener noreferrer">ATI-{request.atiCode}</a></td>
            <td>{request.comments}</td>
            <td>{request.status}</td>
            {isAdmin && (
              <td>
                <button onClick={() => editRequest(request.id)}>Редактировать</button>
                <button onClick={() => deleteRequest(request.id)} style={{marginLeft: '10px'}}>Удалить</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}





export default Table;
