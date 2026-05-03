#!/bin/bash

set -e

BASE_URL="http://localhost:3000/api"

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

echo "Running functional tests..."

INSTRUCTOR_TOKEN=$(curl -s \
  -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@example.com","password":"teach123"}' \
  | jq -r '.token')

if [ "$INSTRUCTOR_TOKEN" = "null" ] || [ -z "$INSTRUCTOR_TOKEN" ]; then
  echo "   FAILED: Could not retrieve instructor token"
  exit 1
fi

echo "Test 6: Instructor login returned token"
echo ""


STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/annotations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $INSTRUCTOR_TOKEN" \
  -d '{"id":"test3","content_id":"sec3","content_type":"section","body":"By contrast, irrational numbers cannot be expressed as a simple fraction."}')

check_status "Test 7: Instructor POST annotation" "201" "$STATUS"

echo "All functional tests passed."