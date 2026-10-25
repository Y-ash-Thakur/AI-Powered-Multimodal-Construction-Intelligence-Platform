@echo off
echo ==============================================================
echo Starting BuildIQ Multimodal Construction Intelligence Platform
echo ==============================================================

start "BuildIQ Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 3 /nobreak >nul

start "BuildIQ Frontend (React/Vite)" cmd /k "cd frontend && npm run dev -- --host 127.0.0.1 --port 5173"

echo.
echo Servers launched!
echo Backend:  http://127.0.0.1:8000 (Swagger docs at /docs)
echo Frontend: http://127.0.0.1:5173
echo.
pause
