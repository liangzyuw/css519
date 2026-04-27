# Currently Implemented Security and Functional Test Cases for CoffeeJelly
Test scripts are found in /test_scripts  

## Security Tests

### Test 1: Invalid email
#### Request - POST /auth/login | Expect: 401 Unauthorized
Try to log in with unrecognized email:   
    Email: invalidstudent@example.com  
    Password: password123

### Test 2: Wrong password
#### Request - POST /auth/login | Expect: 401 Unauthorized
Try to log in with unrecognized password for a valid email:
    Email: student@example.com  
    Password: password1234

### Test 3: Add annotation without login
#### Request - POST /annotations | Expect: 401 Unauthorized
Purpose: If unauthorized users attempt to add annotations while not logged in.  
POST raw json:  
  {  
    "id": "test3",   
    "content_id": "sec3",   
    "content_type": "section",  
    "body": "By contrast, irrational numbers cannot be expressed as a simple fraction."   
  }  

### Test 4: Login as student
#### Request - POST /auth/login | Expect: 200 OK
Try to log in with test email and password in /backend/src/models/credentials.js:   
    Email: invalidstudent@example.com  
    Password: password123

### Test 5: Student tries to POST annotations
#### Request - POST /annotations | Expect: 403 Forbidden
Only users logged in as an instructor should be allowed to POST annotations.
POST raw json:  
  {  
    "id": "test3",   
    "content_id": "sec3",   
    "content_type": "section",  
    "body": "By contrast, irrational numbers cannot be expressed as a simple fraction."   
  }  

## Functional Tests

### Test 6: Login as instructor
#### Request - POST /auth/login | Expect: 200 OK
Try to log in with unrecognized email:   
    Email: teacher@example.com  
    Password: teach123

### Test 7: Instructor tries to POST annotations
#### Request - POST /auth/login | Expect: 201 Created
Only users logged in as an instructor should be allowed to POST annotations.
POST raw json:  
  {  
    "id": "test3",   
    "content_id": "sec3",   
    "content_type": "section",  
    "body": "By contrast, irrational numbers cannot be expressed as a simple fraction."   
  }  