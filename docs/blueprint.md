# **App Name**: E-ASTEKPAM

## Core Features:

- Daily Data Input: Intuitive form for inputting daily data, including inmate counts, personnel assignments, and inventory checks.
- Personnel Selection: Dropdown menus populated from `master_data_pegawai` in Firestore for selecting personnel like Karupam, Anggota Rupam, and Petugas P2U for various shifts.
- Report Generation: Automated generation of daily reports in the specified text format, pulling data from the input forms.
- Report Storage: Secure storage of generated reports in Firebase Storage as .txt files.
- Report Emailing: Functionality to automatically send generated reports as email attachments to designated recipients.
- User Authentication: Implementation of Firebase Authentication for secure user registration, login, and role-based authorization (e.g., admin, data entry personnel).

## Style Guidelines:

- Primary color: Soft blue (#A0C4FF) to create a sense of calm and reliability, befitting a security-focused application.
- Background color: Very light blue (#F0F8FF), a subtle variation on the primary to maintain a cohesive look.
- Accent color: Muted violet (#BDB2FF) for interactive elements, drawing the eye without being alarming.
- Body and headline font: 'PT Sans' (sans-serif) for a modern yet approachable feel, suitable for both headlines and body text.
- Clean, structured layout with clear sections for data input, emphasizing ease of use and readability.