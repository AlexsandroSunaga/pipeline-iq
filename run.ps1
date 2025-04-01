$root = $PSScriptRoot
$venvPython = Join-Path $root "backend\.venv\Scripts\python.exe"
$python = if (Test-Path $venvPython) { $venvPython } else { "python" }
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; `$env:PYTHONPATH='src'; & '$python' -m uvicorn src.main:backend_app --reload --port 8013"
Start-Sleep -Seconds 2
Set-Location "$root\web"
$env:VITE_API_BASE = "http://localhost:8013"
npm run dev
