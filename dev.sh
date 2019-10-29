#!/bin/bash
nginx -s stop
nginx -c $(pwd)/nginx.conf
open http://localhost:8000
cloud_sql_proxy -instances=warycat:us-central1:rustgym-beta=tcp:5432 &
(cd client && npm run dev) &
(cd portal && npm run dev) &
(cd example && npm run start) &
(cd server && cargo watch -x run)
