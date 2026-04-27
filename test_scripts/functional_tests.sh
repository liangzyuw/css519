#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "---- Test 6: Login as instructor ----"
echo "Expected: 200 OK with token"
INSTRUCTOR_TOKEN=$(curl -s \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@example.com","password":"teach123"}' \
  | jq -r '.token')

echo "Instructor token: $INSTRUCTOR_TOKEN"

echo "---- Test 7: Instructor POST ----"
echo "Expected: 201 Created"
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $INSTRUCTOR_TOKEN" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"By contrast, irrational numbers cannot be expressed as a simple fraction."}'