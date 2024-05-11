import React, { useState, useEffect } from 'react';
import { Button, TextInput, } from '@gravity-ui/uikit';
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
        view="clear"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Дата получения"
        className={styles.dateInput}
      />
      <TextInput
        view="clear"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        placeholder="Название фирмы клиента"
        required
        minLength="2"
        className={styles.inputStyle}
      />
      <TextInput
        view="clear"
        name="carrierName"
        value={formData.carrierName}
        onChange={handleChange}
        placeholder="ФИО перевозчика"
        className={styles.inputStyle}
      />
      <TextInput
        view="clear"
        name="carrierPhone"
        value={formData.carrierPhone}
        onChange={handleChange}
        placeholder="Контактный телефон перевозчика"
        className={styles.inputStyle}
      />
      <TextInput
        view="clear"
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Комментарий"
        className={styles.inputStyle}
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
        view="clear"
        name="atiCode"
        value={formData.atiCode}
        onChange={handleChange}
        placeholder="ATI код"
        className={styles.inputStyle}
      />
      <Button variant="primary" className={styles.button} onClick={handleSubmit}>Сохранить</Button>
    </form>
  );
}

export default RequestForm;
