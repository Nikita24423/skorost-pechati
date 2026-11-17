@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   Скорость печати
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [Ошибка] Node.js не найден.
  echo Установите Node.js с https://nodejs.org и запустите этот файл снова.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [Ошибка] npm не найден. Переустановите Node.js.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Установка зависимостей...
  call npm install
  if errorlevel 1 (
    echo [Ошибка] Не удалось установить зависимости.
    pause
    exit /b 1
  )
  echo.
) else (
  echo Зависимости уже установлены.
  echo.
)

if not exist "data\" mkdir data

echo Освобождаю порт 3000, если занят...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  echo Останавливаю процесс %%a
  taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Запуск приложения...
echo Откройте в браузере: http://localhost:3000
echo Чтобы остановить сервер, закройте это окно.
echo.

start "" "http://localhost:3000"
call npm start

pause
