# Scraper workers (Pipeline IQ)

Ethical / demo scrapers run **outside** the request path — same pattern as production (scheduler → worker → DB).

- `run_reference_job.py` — HTTP fetch + normalize (mirrors API job `posts`)
- Extend with Playwright for JS-heavy sites when a client engagement requires it

```powershell
cd ..
pip install -r backend/requirements.txt
python scrapers/run_reference_job.py
```
