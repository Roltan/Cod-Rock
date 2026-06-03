# Фронтенд проекта Cod-Rock

React приложение для работы с API бэкенда.

## Требования

- Node.js (версия 14 или выше)
- npm или yarn

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск проекта в режиме разработки

```bash
npm start
```

Приложение откроется в браузере по адресу `http://localhost:3000`

## Настройка API

### Текущая конфигурация

По умолчанию API запросы идут на `http://127.0.0.1:3001`

### Как изменить адрес API

#### Windows (PowerShell)

**Базовая команда:**
```powershell
# Замена во всех файлах src/
Get-ChildItem -Path .\src -Recurse -Include *.js,*.jsx | ForEach-Object { (Get-Content $_.FullName) -replace 'http://127\.0\.0\.1:3001', 'http://ваш-домен.ru:3001' | Set-Content $_.FullName }
```

**Примеры:**
```powershell
# Заменить на localhost:5000
Get-ChildItem -Path .\src -Recurse -Include *.js,*.jsx | ForEach-Object { (Get-Content $_.FullName) -replace 'http://127\.0\.0\.1:3001', 'http://localhost:5000' | Set-Content $_.FullName }

# Заменить на удаленный сервер
Get-ChildItem -Path .\src -Recurse -Include *.js,*.jsx | ForEach-Object { (Get-Content $_.FullName) -replace 'http://127\.0\.0\.1:3001', 'https://api.example.com' | Set-Content $_.FullName }
```

#### Linux / macOS (Bash)

**Базовая команда:**
```bash
# Замена во всех файлах src/
find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's|http://127\.0\.0\.1:3001|http://ваш-домен.ru:3001|g' {} +
```

**Примеры:**
```bash
# Заменить на localhost:5000
find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's|http://127\.0\.0\.1:3001|http://localhost:5000|g' {} +

# Заменить на удаленный сервер
find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's|http://127\.0\.0\.1:3001|https://api.example.com|g' {} +
```

**Для macOS используй:**
```bash
# На macOS нужен параметр '' после -i
find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i '' 's|http://127\.0\.0\.1:3001|http://ваш-домен.ru:3001|g' {} +
```

## Примечания для бэкендера

- Проект использует `react-scripts` (create-react-app)
- Dev сервер автоматически перезагружается при изменении файлов
- API запросы идут через `axios` с JWT токенами в заголовках
- Токен хранится в `localStorage`
