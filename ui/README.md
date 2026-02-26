Supply Chain Intelligence — Deployment Plan Viewer

How to run locally:

1. From the repository root open a terminal.

2. Start a lightweight HTTP server (Python recommended):
   - Python 3.x:

     ```
     python -m http.server 8000
     ```

   - Or (PowerShell):
     ```powershell
     Start-Process python -ArgumentList '-m','http.server','8000'
     ```

3. Open your browser and go to:

   http://localhost:8000/ui/

4. The page will fetch `DEPLOYMENT-PLAN.md` from the repository root and render it.

Notes:

- The checklist state (checkboxes) is saved to `localStorage` in your browser.
- This is a local preview for demonstration purposes. For production, serve through a secure web server and add authentication.
