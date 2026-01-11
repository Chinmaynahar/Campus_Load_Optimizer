#!/bin/bash

echo "========================================"
echo " Cognitive Load Management System Setup"
echo "========================================"
echo

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this setup script again."
    exit 1
fi

echo "Node.js found! Installing dependencies..."
echo

npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo
echo "========================================"
echo " Setup Complete!"
echo "========================================"
echo
echo "To start the server, run:"
echo "  npm start"
echo
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo
echo "Demo Accounts:"
echo "  Student:   student@university.edu / password"
echo "  Professor: prof@university.edu / password"
echo "  Admin:     admin@university.edu / password"
echo
echo "Press Enter to start the server now..."
read

echo "Starting server..."
npm start