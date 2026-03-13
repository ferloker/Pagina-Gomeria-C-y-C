@echo off
echo ===================================================
echo   Levantando Servidor de Gomeria C y C...
echo ===================================================
echo.

if not exist node_modules (
    echo Instalando dependencias necesarias...
    call npm install
)

echo Iniciando el servidor...
echo.
echo Presiona CTRL+C para detener el servidor.
echo.

start http://localhost:3001
npm start
