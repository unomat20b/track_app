import React, { useState, useEffect } from 'react';
import { Button, TextInput, Select, TextArea } from '@gravity-ui/uikit';
import styles from './RequestForm.module.css';


function RequestForm({ onSubmit, initialData = {} }) {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (`0${today.getMonth() + 1}`).slice(-2);
    const day = (`0${today.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: getTodayDate(),
    clientName: '',
    carrierName: '',
    carrierPhone: '',
    comments: '',
    status: 'new',  // Устанавливаем как строку для `Select`
    atiCode: '',
    id: ''
  });  


  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date || getTodayDate()
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value // Простое присваивание значения
    }));
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.clientName || formData.clientName.length < 2) {
        alert('Название фирмы клиента должно содержать минимум два символа.');
        return;
    }

    const dataToSubmit = {
        ...formData
    };

    onSubmit(dataToSubmit);

    setFormData({
        date: getTodayDate(),
        clientName: '',
        carrierName: '',
        carrierPhone: '',
        comments: '',
        status: 'new',
        atiCode: '',
        id: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {formData.id && <h2 className={styles.h2}>Редактирование заявки №{formData.id}</h2>}
      <TextInput
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Дата получения"
        className={styles.dateInput}
      />
      <TextInput
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        placeholder="Название фирмы клиента"
        required
        minLength="2"
      />
      <TextInput
        name="carrierName"
        value={formData.carrierName}
        onChange={handleChange}
        placeholder="ФИО перевозчика"
      />
      <TextInput
        name="carrierPhone"
        value={formData.carrierPhone}
        onChange={handleChange}
        placeholder="Контактный телефон перевозчика"
      />
      <TextArea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Комментарии"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className={styles.inputStyle}
      >
        <option value="new">Новая</option>
        <option value="inProgress">В работе</option>
        <option value="completed">Завершено</option>
      </select>
      <TextInput
        name="atiCode"
        value={formData.atiCode}
        onChange={handleChange}
        placeholder="ATI код"
      />
      <Button variant="primary" className={styles.button} onClick={handleSubmit}>Сохранить</Button>
    </form>
  );
}

export default RequestForm;
