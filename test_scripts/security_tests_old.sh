#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "---- Test 1: Invalid email ----"
echo "Expected: 401 Unauthorized"
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"invalidstudent@example.com","password":"password123"}'

echo "---- Test 2: Wrong password ----"
echo "Expected: 401 Unauthorized"
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password1234"}'

echo "---- Test 3: POST annotation without login ----"
echo "Expected: 401 Unauthorized"
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"Test"}'

echo "---- Test 4: Login as student ----"
echo "Expected: 200 OK with token"
STUDENT_TOKEN=$(curl -s \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}' \
  | jq -r '.token')

echo "Student token: $STUDENT_TOKEN"

echo "---- Test 5: Student tries POST (should be 403) ----"
echo "Expected: 403 Forbidden"
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"Test"}'