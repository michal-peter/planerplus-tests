# Test cases

Target: production [planerplus.pl](https://planerplus.pl). All tests are non-destructive: no account is created and no data is changed.
Registration tests never reach the backend (the sign-up endpoint is stubbed). Tests marked **needs account** are skipped unless `TEST_EMAIL` and `TEST_PASSWORD` are set.

| ID | Area | Steps | Expected result | Technique | Status |
|----|------|-------|-----------------|-----------|--------|
| TC-LAND-01 | Landing | Open `/` | Plans Start, Plus and Max are visible | Equivalence partitions (each plan) | Automated |
| TC-LAND-02 | Landing | Click "Wybieram Plus" | URL contains `mode=register` and `plan=plus`; "Nowe konto" shown | Equivalence partitions (plan selection) | Automated |
| TC-LAND-03 | Landing | Click "Zaloguj" | Login screen at `/app` | Equivalence partitions | Automated |
| TC-LOGIN-01 | Login | Enter valid test account credentials, click "Zaloguj" | Auth screen disappears; app (or PIN prompt) shown. **Needs account** | Equivalence partitions (valid class) | Automated |
| TC-LOGIN-02 | Login | Valid email, wrong password | "Złe dane logowania — sprawdź email i hasło". **Needs account** | Equivalence partitions (valid email / invalid password) | Automated |
| TC-LOGIN-03 | Login | Well-formed email that has no account, any password | "Złe dane logowania — sprawdź email i hasło" | Equivalence partitions (unknown user) | Automated |
| TC-LOGIN-04 | Login | Leave both fields empty, click "Zaloguj" | "Wpisz email i hasło" | Boundary values (empty input) | Automated |
| TC-LOGIN-05 | Login | Only email filled | "Wpisz email i hasło" | Boundary values (one field empty) | Automated |
| TC-LOGIN-06 | Login | Only password filled | "Wpisz email i hasło" | Boundary values (one field empty) | Automated |
| TC-LOGIN-07 | Login | Email `abc` (no `@`) | "Nieprawidłowy adres email" | Equivalence partitions (invalid format) | Automated |
| TC-LOGIN-08 | Login | Email `user@` (no domain) | "Nieprawidłowy adres email" | Equivalence partitions (invalid format) | Automated |
| TC-LOGIN-09 | Login | Email `@example.com` (no local part) | "Nieprawidłowy adres email" | Equivalence partitions (invalid format) | Automated |
| TC-LOGIN-10 | Login | Email `user example@x.pl` (space) | "Nieprawidłowy adres email" | Equivalence partitions (invalid format) | Automated |
| TC-REG-01 | Registration | Open `/app?mode=register` | "Nowe konto" heading and password hint (min. 6 characters) shown | Equivalence partitions | Automated |
| TC-REG-02 | Registration | Submit empty form | "Wpisz email i hasło"; no request sent | Boundary values (empty input) | Automated |
| TC-REG-03 | Registration | Fill email and name, no password | "Wpisz email i hasło"; no request sent | Boundary values (one field empty) | Automated |
| TC-REG-04 | Registration | Fill password and name, no email | "Wpisz email i hasło"; no request sent | Boundary values (one field empty) | Automated |
| TC-REG-05 | Registration | Password of 1 character | "Hasło musi mieć min. 6 znaków"; no request sent | Boundary values (minimum length, far below) | Automated |
| TC-REG-06 | Registration | Password of 5 characters | "Hasło musi mieć min. 6 znaków"; no request sent | Boundary values (minimum length − 1) | Automated |
| TC-REG-07 | Registration | Password of 6 characters (stubbed backend) | Length error not shown; form proceeds to the backend call | Boundary values (minimum length) | Automated |
| TC-REG-08 | Registration | Password and repeated password differ | "Hasła się różnią"; no request sent | Equivalence partitions (mismatch) | Automated |
| TC-REG-09 | Registration | Email `not-an-email` (stubbed backend) | "Nieprawidłowy adres email" | Equivalence partitions (invalid format) | Automated |
