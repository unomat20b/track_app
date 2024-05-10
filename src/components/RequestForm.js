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

  const handleChange = e => {
    const { name, value } = e.target;
    
    // Для Select, поддерживающего одиночный выбор, нужно просто установить значение.
    // Если Select ожидает массив, тогда обрабатываем как массив.
    if (name === "status") {
      // Для Select, который не требует массив, устанавливаем как строку
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value  // Прямое присваивание значения
      }));
    } else {
      // Для всех других элементов управления обновление происходит как обычно
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
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
  

    onSubmit(dataToSubmit);

    setFormData({
        date: getTodayDate(),
        clientName: '',
        carrierName: '',
        carrierPhone: '',
        comments: '',
        status: ['new'],
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
        className={styles.inputStyle}
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
      <Select
        name="status"
        value={[formData.status]}  // Установка значения как массива
        onChange={handleChange}
      >
        <option value="new">Новая</option>
        <option value="inProgress">В работе</option>
        <option value="completed">Завершено</option>
      </Select>


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
