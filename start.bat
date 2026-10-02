@echo off
title ContentCraft AI — Launcher
echo ========================================================
echo   Launching ContentCraft AI (Autonomous Agent Engine)
echo ========================================================
echo.
echo Starting local web server on http://localhost:3000 ...
start http://localhost:3000
npx -y serve . -l 3000
pause
