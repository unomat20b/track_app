# Документация REST API проекта Track_App

## Описание
REST API для "управления данными пользователей и их аналитики".

### Цели API
- Получение данных пользователями для работы в сторонних программах.
- Добавление и управление данными для сотрудников с соответствующими правами доступа.
- Возможность разделения данных по организациям, отделам и доступа для сторонних гостей.

### Ограничения
- Для некоторых групп данных будет предоставляться только в обезличенной форме для статистических целей.

## Аутентификация
Для доступа к API необходим API ключ. API ключ должен передаваться в каждом запросе через заголовок `Authorization`:
\`\`\`http
Authorization: Api-Key {ваш_api_ключ}
\`\`\`

## Форматы данных
- **JSON**: для использования в сторонних программах.
- **XML**: для пользователей, которым необходимы данные в табличной форме.

## Конечные точки

### Получение данных пользователя
**GET /users**

#### Параметры
- `organization_id` (int, optional): ID организации для фильтрации пользователей.
- `department_id` (int, optional): ID отдела для фильтрации пользователей.

#### Пример запроса
\`\`\`http
GET /users?organization_id=1 HTTP/1.1
Host: api.example.com
Authorization: Api-Key ваш_api_ключ
\`\`\`

#### Пример успешного ответа
\`\`\`json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Иван Иванов",
      "role": "Администратор"
    }
  ]
}
\`\`\`

#### Коды ответов
- `200 OK`: Успешное получение данных.
- `401 Unauthorized`: Неавторизованный доступ, неверный API ключ.
- `500 Internal Server Error`: Внутренняя ошибка сервера.

## Ошибки
### Описание общих ошибок API и способы их обработки.

#### Дублирование данных
В случае обнаружения дубликатов данных, API отправит список возможных дублей с предложением заменить или оставить оба варианта.

## Ограничения
- Максимальное количество запросов в минуту: 1.
