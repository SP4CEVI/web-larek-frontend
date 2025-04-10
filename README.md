# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовые классы
 
 - `Api` - включает в себя основную логику для отправки запросов и обработки ответов от сервера.

 Поля:
 `baseUrl: string` - основной URL для API.
 `options: RequestInit` - параметры для функции fetch.
 
 Конструктор принимает основной адрес сервера и необязательный объект с заголовками запросов.
 
 Методы:
 `get()` - выполняет GET-запрос на указанный эндпоинт.
 `post()` - отправляет данные в JSON-формате на указанный эндпоинт.
 `handleResponse()` - обрабатывает ответ от сервера.
 
 - `EventEmitter` - реализует событийную модель в приложении.
 
 Поля:
 `events` - хранилище подписчиков на события.
 
 Методы:
 `on` - подписывает функцию на событие.
 `off` - отменяет подписку функции на событие.
 `onAll` - подписывает функцию на все события.
 `offAll` - отменяет все подписки.
 `emit` - вызывает всех подписчиков события с передачей данных.
 `trigger` - создает функцию-триггер для события.
 
 - `Component<T>` - абстрактный базовый класс для всех UI-компонентов.
 
 Методы:
 `toggleClass` - переключает CSS-класс элемента.
 `updateTextContent` - устанавливает текстовое содержимое элемента.
 `setElementDisabled` - блокирует/разблокирует элемент.
 `hideElement` - скрывает элемент.
 `showElement` - показывает элемент.
 `updateImageSource` - устанавливает изображение и альтернативный текст.
 `render` - рендеринг компонента с передачей данных.
 
 ## Классы представления
 
 Классы представления — программные компоненты, которые подготавливают данные для отображения в пользовательском интерфейсе, обеспечивая связь между логикой приложения и его визуальным представлением.
 
 - `Page` - главная страница с каталогом товаров.
 
 Методы:
 `counter` - установка значения счетчика товаров в корзине.
 `gallery` обновление каталога товаров.
 `locked` - блокировка/разблокировка страницы.
 
 
 - `Modal` -  отвечает за отображение модальных окон.
 
 Методы :
 `open()` - открывает модальное окно.
 `close()` - закрывает модальное окно.
 `render()` - рендерит содержимое модального окна.

 
 - `Card` - представляет компонент карточки товара, который отвечает за отображение информации о продукте.
 
 Методы :
 `id`  - получение/установка ID товара.
 `title` - установка названия товара.
 `image` - установка изображения товара.
 `price` - установка цены товара.
 `category` - установка категории товара.
 `description` - установка описания товара.
 
 - `Basket` - управляет корзиной товаров.
 
 Методы :
 `updateProductsList(listElement: HTMLElement)` - обновление списка товаров в корзине.
 `updateTotalPrice(price: number)` - обновление общей стоимости товаров.
 
 ## Список событий
 
 События товаров:
 `item:click` - передает id товара при нажатии
 `item:add` - добавление товара в корзину
 `item:remove` - удаление товара из корзины
 
 События корзины:
 `basket:open` - открытие корзины
 `basket:change` - изменение содержимого корзины
 `basket:clear` - очистка корзины
 
 События заказа:
 `order:open` - начало оформления заказа
 `order:submit` - отправка заказа
 `order:paymentChange` - изменение способа оплаты
 `order:addressChange` - изменение адреса доставки
 `order:contactsChange` - изменение контактных данных
 
 События модальных окон:
 `modal:open` - открытие модального окна
 `modal:close` - закрытие модального окна
 
 События форм:
 `formErrors:change` - изменение ошибок валидации
 `formSubmit:contacts` - отправка контактных данных
 `formSubmit:delivery` - отправка данных доставки
 
 События успешных операций:
 `success:open` - открытие окна успеха
 `success:close` - закрытие окна успеха
 `order:success` - успешное оформление заказа
 
 Системные события:
 `page:lock` - блокировка страницы
 `page:unlock` - разблокировка страницы
 `data:changed` - изменение данных в модели