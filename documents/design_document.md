## CoffeeJelly - Textbook Platform with Educators’ Annotations

---

## 1. Introduction

CoffeeJelly is a web-based educational platform purposed and designed towards improving how students interact with textbook content in classroom settings and environments. This system allows teachers, instructors, and professors to add contetxual annotations, explanations, and hints directly embedded into textbook content. By serving as another form of communication between students and educators, they can receive targeted instructional support while reading or solving material.  

Most textbook platforms have limited opportunities for instructor-guided clarification, so CoffeeJelly addresses this gap by combining textbook content, teachers' annotations, and overall course structure into a single software product. The intention is to leave the guidance in the teacher's hands, while being a bridge that supports the connection with students. The long-term goal is to adapt additional features, both familiar and innovative to foster an accessible learning environment for future generations of students. For instance, a way for students to request annotations of particular problems, so instructors would know ahead of time which aspects most students seem troubled by.  

This project is currently implemented as a mock educational web application with hard-coded textbook content and simulated operational data. Although simplified, the architecture is designed to reflect real-world software engineering concerns such as modular service design, authentication, API security, Dockerized deployment, and operational observability.

### 1.1 Purpose
This document outlines the technical design for a web-based textbook platform that enables educators to embed annotations and contextual explanations directly within textbook content and problem sets. The system aims to improve student comprehension and engagement, especially for material content meant to practice higher-order thinking skills such as critical thinking. 

The purpose of CoffeeJelly is to explore how software systems can improve educational delivery by making textbook content more interactive and instructor-aware. Many students struggle not because educational content is unavailable, but because explanations are often separated from the exact point of confusion. A student may encounter a definition, theorem, or homework problem and need immediate contextual guidance.

CoffeeJelly aims to support this need by allowing instructors to attach annotations directly to textbook sections or problems. These annotations may include:

- Clarifying explanations
- Homework hints
- Conceptual reminders
- Common mistake warnings
- Additional context for difficult ideas

In a broader educational context, this could assist improve student comprehension, reduce barriers to independent study, and provide instructors with a scalable way to support many students at once.

### 1.2 Current Scope

The current mock implementation includes:

- React frontend for textbook viewing
- Node.js/Express backend API
- Hard-coded textbook content
- Hard-coded user credentials
- Annotation creation and retrieval APIs
- Dockerized backend service
- Dockerized frontend service
- Separate Dockerized operational excellence dashboard
- Fake metrics endpoint for dashboard display

### 4.2 Out of Scope for Current Version

The following features are not part of the current mock implementation but are planned as future enhancements:

- Persistent database storage
- Production-grade authentication
- Full JWT validation middleware
- Instructor annotation editor UI
- Student/instructor role-based permissions
- Real metrics emitted from backend services
- Cloud deployment


### 4.3 Desired Implementations
- Real-time collaboration
- Full course assignment workflow
- Password hashing
- Personalized Student Workbooks and Notes
- Possible AI integration 

---

## 2. System Overview


### 5. High-Level Architecture

Product uses a multi-container architecture consisting of four major components:

1. **Frontend Web Application**
2. **Backend API Service**
3. **Operational Excellence Dashboard**
4. **Dashboard Metrics API**

The system is deployed locally using Docker Compose.

```text
+-------------------+        +-------------------+
|                   |        |                   |
| React Frontend    | -----> | Express Backend   |
| localhost:5173    |        | localhost:3000    |
|                   |        |                   |
+-------------------+        +-------------------+


+----------------------------+        +----------------------------+
|                            |        |                            |
| OE Dashboard Interface     | -----> | Dashboard Metrics API      |
| localhost:5001             |        | localhost:4001             |
|                            |        |                            |
+----------------------------+        +----------------------------+
```

### 2.2 Key Design Principles
- **Modularity**: Independent services for scalability
- **Usability**: Minimal friction for students and educators
- **Security**: Role-based access and data protection

The primary goals of the system are:

1. Provide a web-based interface for viewing textbook content.
2. Allow instructor-created annotations to appear alongside textbook sections and problems.
3. Support simple authentication so users must log in before accessing course content.
4. Provide RESTful APIs for textbook content, annotations, users, courses, and enrollments.
5. Run the application using Docker containers for consistent deployment.
6. Provide a separate operational excellence dashboard for monitoring product state.

---

## 3. Functional Components

### 3.1 Content Management Service

#### Responsibilities
- Store and organize textbook content
- Segment content into chapters, sections, and problems

#### Current Data Model
- Textbook(id, title, author)  
- Chapter(id, textbook_id, title, order_index)  
- Section(id, chapter_id, title, content)  
- Problem(id, section_id, question_text)  
- Annotation(id, content_id, content_type, -- section | problem, author_id, body, visibility, -- always | on_request created_at)

#### User & Authentication Service
- User(id, name, email, role, created_at)  
- Course(id, title, instructor_id)  
- Enrollment(id, user_id, course_id)  

#### APIs:  
- POST /courses  
- POST /assignments  
- GET /courses/{id}/content 
- GET /chapters/{chapter_id}/sections
- POST /sections/{section_id}/problems

##### Educator end:
- POST /annotations (on section)  
{
  "content_id": "section_123",
  "content_type": "section",
  "author_id": "user_1",
  "body": "This definition is important!",
  "visibility": "always"
}

- POST /annotations (on problem)  
{
  "content_id": "problem_456",
  "content_type": "problem",
  "author_id": "user_2",
  "body": "Hint: Think about additive identity.",
  "visibility": "on_request"
}  

Any annotation created must match content_id and content_type with its location.  

To test creating an annotation on POSTMAN,  

POST: http://localhost:3000/api/annotations
body:   
{
  "content_id": "sec1",
  "content_type": "section",
  "author_id": "user_1",
  "body": "This is a test annotation from Postman",
  "visibility": "always"
}  

Then check with:   

GET: http://localhost:3000/api/annotations?content_type=section&content_id=sec1  

It should show the same content in the body.   

- GET /annotations?content_type=problem&content_id=problem_456  
- GET /annotations/request?content_id=problem_456  

Course management:
- POST /courses  
{
  "title": "Linear Algebra 101",
  "instructor_id": "user_10"
}
- GET /courses
- GET /api/courses/{course_id}  

##### Authentication:
- POST /users  
{
  "name": "Alice",
  "email": "alice@example.com",
  "role": "student"
}

- POST /auth/login  
{
  "email": "alice@example.com",
  "password": "securepassword"
}

- (Get current user) GET /api/me  
Authorization: Bearer <token>

##### Enrollment:

- POST /api/enrollments  
{
  "user_id": "user_1",
  "course_id": "course_5"
}
- GET /api/courses/{course_id}/students  
- GET /api/users/{user_id}/courses  

<!-- #### Student Interaction Service
- Highlight(id, user_id, section_id, start_offset, end_offset)  
- Bookmark(id, user_id, content_id)  
- HintUsage(id, user_id, annotation_id, timestamp)   -->

## 4. Frontend Design

### 4.1 Technology Stack
- React 
- TypeScript  
- Vite
- Tailwind CSS (UI styling)  
- Axios

### 4.2 Key Potential UI Components
- Textbook Viewer  
- Scrollable content  
- Inline annotation markers  
- Annotation Panel  
- Displays hints/explanations  
- Expandable on click  
- Classroom Dashboard  
- Assignments list  
- Progress tracking  
- Instructor Editor  
- Inline annotation creation tool  

## 5. API Design
### 5.1 Design Style
RESTful API or GraphQL, JSON request/response format
### 5.2 Example Request
POST /annotations  

Content-Type: application/json  
{
  "content_id": "123",
  "content_type": "problem",
  "type": "hint",
  "body": "Consider breaking this into smaller subproblems.",
  "visibility": "on_request"
}

## 6. Non-Functional Requirements
### 6.1 Performance
- Page load time < 2 seconds  
- Annotation fetch latency < 200ms  
### 6.2 Reliability
- 99.9% uptime target  
- Automated backups  

## 7. Considerations
| Risk                    | Mitigation                         |
| ----------------------- | ---------------------------------- |
| Over-reliance on hints  | Progressive hint unlocking         |
| Poor annotation quality | Instructor guidelines + review     |
| Scalability bottlenecks | Microservices + load balancing     |
| Data privacy concerns   | Strict access control + encryption |
