import React from 'react';
import { Button } from '@gravity-ui/uikit';
import styles from './Table.module.css';

function Table({ requests, editRequest, deleteRequest, sortRequests, isAdmin }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => sortRequests('date')}>Дата</th>
            <th onClick={() => sortRequests('clientName')}>Клиент</th>
            <th onClick={() => sortRequests('carrierName')}>Перевозчик</th>
            <th onClick={() => sortRequests('carrierPhone')}>Телефон</th>
            <th>ATI Код</th>
            <th onClick={() => sortRequests('comments')}>Комментарии</th>
            <th onClick={() => sortRequests('status')}>Статус</th>
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
              <td>{request.atiCode ? <a href={`https://ati.su/firms/${request.atiCode}/info`} target="_blank" rel="noopener noreferrer">ATI-{request.atiCode}</a> : 'none'}</td>
              <td>{request.comments}</td>
              <td>{request.status}</td>
              {isAdmin && (
                  <td>
                      <Button className={styles.editButton} onClick={() => editRequest(request.id)}>Редактировать</Button>
                      <Button className={styles.deleteButton} onClick={() => deleteRequest(request.id)}>Удалить</Button>
                  </td>
              )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
