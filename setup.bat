@echo off
echo ========================================
echo  Cognitive Load Management System Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this setup script again.
    pause
    exit /b 1
)

echo Node.js found! Installing dependencies...
echo.

npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Setup Complete! 
echo ========================================
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo Demo Accounts:
echo   Student:   student@university.edu / password
echo   Professor: prof@university.edu / password  
echo   Admin:     admin@university.edu / password
echo.
echo Press any key to start the server now...
pause >nul

echo Starting server...
npm start