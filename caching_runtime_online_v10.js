@echo off
title Pod 9x16 Converter v10.1 Online Cache Runtime
color 0B
setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo.
echo   PPPPP    OOOOO   DDDDD    CCCCC    AAAAA    SSSSS   TTTTTTT
echo   P    P  O     O  D    D  C        A     A  S           T
echo   PPPPP   O     O  D    D  C        AAAAAAA   SSSSS      T
echo   P       O     O  D    D  C        A     A       S      T
echo   P        OOOOO   DDDDD    CCCCC   A     A  SSSSS       T
echo.
echo    99999   x   x   111111   666666
echo   9     9   x x       11   6
echo   9     9    x        11   66666
echo    999999   x x       11   6    6
echo         9  x   x   111111  666666
echo.
echo ============================================================================
echo.
echo                    PODCAST 9x16 CONVERTER Online Cache Runtime
echo.
echo                        Version : 10.1
echo                        Status  : Production
echo                        Engine  : Flask + Ollama
echo.
echo                  Developed by : CHulk
echo.
echo ============================================================================

if not exist "venv\Scripts\activate.bat" (
echo [ERROR] Virtual environment not found. Run setup.bat first.
exit /b 1
)

call venv\Scripts\activate.bat
if errorlevel 1 (
echo [ERROR] Failed to activate virtual environment.
exit /b 1
)

echo.
echo [..] Checking Ollama at http://localhost:11434
python -c "import sys, urllib.request; urllib.request.urlopen('http://localhost:11434', timeout=3); sys.exit(0)" >nul 2>&1

if errorlevel 1 (
echo [WARN] Ollama not reachable at http://localhost:11434
echo        Start Ollama with: ollama serve
) else (
echo [OK] Ollama is reachable.
)

echo.
echo [..] Checking for model qwen3.6

where ollama >nul 2>&1

if errorlevel 1 (
echo [WARN] ollama CLI not found in PATH; skipping model check.
) else (
ollama list 2^>nul | findstr /I "qwen3.6" >nul
if errorlevel 1 (
echo [WARN] Model qwen3.6 not found in Ollama.
echo        Pull it with: ollama pull qwen3.6
) else (
echo [OK] Model qwen3.6 is available.
)
)

echo.
echo ============================================================================
echo                         STARTING APPLICATION
echo ============================================================================
echo.
echo  Web Interface : http://localhost:5000
echo  AI Engine     : Ollama
echo  Model         : qwen3.6
echo.
echo  Press Ctrl+C to stop the server
echo.
echo ============================================================================

python app.py

echo.
echo ============================================================================
echo                          SERVER STOPPED
echo ============================================================================
echo.

endlocal
exit /b 0
