import React, { useState, useEffect } from 'react';

function RequestForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    clientName: '',
    carrierName: '',
    carrierPhone: '',
    comments: '',
    status: 'new',
    date: new Date().toISOString().slice(0, 10),
    atiCode: '', // Пустое значение по умолчанию
    ...initialData,
});


  useEffect(() => {
    setFormData({
        clientName: '',
        carrierName: '',
        carrierPhone: '',
        comments: '',
        status: 'new',
        date: new Date().toISOString().slice(0, 10),
        atiCode: '',
        ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value || (name === 'atiCode' ? '' : '')
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка, что carrierName определено
    if (!formData.carrierName || formData.carrierName.length < 2) {
        alert('ФИО перевозчика должно содержать минимум два символа.');
        return;
    }
    
    onSubmit(formData);
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={formData.date || ''}
        onChange={handleChange}
        placeholder="Дата получения"
      />
      <input
        type="text"
        name="clientName"
        value={formData.clientName || ''}
        onChange={handleChange}
        placeholder="Название фирмы клиента"
      />
      <input
        type="text"
        name="carrierName"
        value={formData.carrierName || ''}
        onChange={handleChange}
        placeholder="ФИО перевозчика"
      />
      <input
        type="text"
        name="carrierPhone"
        value={formData.carrierPhone || ''}
        onChange={handleChange}
        placeholder="Контактный телефон перевозчика"
      />
      <textarea
        name="comments"
        value={formData.comments || ''}
        onChange={handleChange}
        placeholder="Комментарии"
      ></textarea>
      <select
        name="status"
        value={formData.status || 'new'}
        onChange={handleChange}
      >
        <option value="new">Новая</option>
        <option value="inProgress">В работе</option>
        <option value="completed">Завершено</option>
      </select>
      <input
        type="text"
        name="atiCode"
        value={formData.atiCode || ''}
        onChange={handleChange}
        placeholder="ATI код"
      />
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default RequestForm;
