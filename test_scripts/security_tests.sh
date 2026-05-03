#!/bin/bash

set -e

BASE_URL="http://localhost:3000/api"

# GitHub Actions only fails if the script exits with a non-zero status code.
check_status() {
  local test_name="$1"
  local expected="$2"
  local actual="$3"

  echo "$test_name"
  echo "Expected: $expected"
  echo "Actual:   $actual"

  if [ "$actual" != "$expected" ]; then
    echo "   FAILED: $test_name"
    exit 1
  else
    echo "   PASSED"
  fi

  echo ""
}

echo "Running security tests..."

STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"invalidstudent@example.com","password":"password123"}')

check_status "Test 1: Invalid email" "401" "$STATUS"


STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password1234"}')

check_status "Test 2: Wrong password" "401" "$STATUS"


STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"Test"}')

check_status "Test 3: POST annotation without login" "401" "$STATUS"


STUDENT_TOKEN=$(curl -s \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}' \
  | jq -r '.token')

if [ "$STUDENT_TOKEN" = "null" ] || [ -z "$STUDENT_TOKEN" ]; then
  echo "Test 4 FAILED: Could not retrieve student token"
  exit 1
fi

echo "Test 4: Student login returned token"
echo ""


STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"Test"}')

check_status "Test 5: Student tries POST annotation" "403" "$STATUS"

echo "All security tests passed."