import React, { useState, useEffect } from 'react';

function RequestForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    clientName: '',
    carrierName: '',
    carrierPhone: '',
    comments: '',
    status: 'new',
    date: '', // Добавьте начальное состояние для даты
    ...initialData
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" value={formData.date || ''} onChange={handleChange} placeholder="Дата получения" />
      <input type="text" name="clientName" value={formData.clientName || ''} onChange={handleChange} placeholder="Название фирмы клиента" />
      <input type="text" name="carrierName" value={formData.carrierName || ''} onChange={handleChange} placeholder="ФИО перевозчика" />
      <input type="text" name="carrierPhone" value={formData.carrierPhone || ''} onChange={handleChange} placeholder="Контактный телефон перевозчика" />
      <textarea name="comments" value={formData.comments || ''} onChange={handleChange} placeholder="Комментарии"></textarea>
      <select name="status" value={formData.status || 'new'} onChange={handleChange}>
        <option value="new">Новая</option>
        <option value="inProgress">В работе</option>
        <option value="completed">Завершено</option>
      </select>
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default RequestForm;
