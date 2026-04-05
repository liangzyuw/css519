## Textbook Platform with Educators’ Annotations

---

## 1. Introduction

### 1.1 Purpose
This document outlines the technical design for a web-based textbook platform that enables educators to embed annotations and contextual explanations directly within textbook content and problem sets. The system aims to improve student comprehension and engagement, especially for material content meant to practice higher-order thinking skills such as critical thinking. 

### 1.2 Scope
The platform supports:
- Digital textbook library and rendering
- Instructor-created annotations
- Student interaction with comments and forums
- Classroom-based access control
- Possible analytics on engagement and learning behavior

---

## 2. System Overview

### 2.1 High-Level Architecture
**client-server architecture** with a modular backend:


### 2.2 Key Design Principles
- **Modularity**: Independent services for scalability
- **Usability**: Minimal friction for students and educators
- **Security**: Role-based access and data protection

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
- Problem(id, section_id, question_text, difficulty_level)  
- Annotation(
  id, 
  content_id, 
  content_type, -- section | problem, 
  author_id, 
  type, 
  body, 
  visibility, -- always | on_request 
  created_at 
)

#### User & Authentication Service
- User(id, name, email, role, created_at)  
- Course(id, title, instructor_id)  
- Enrollment(id, user_id, course_id)  

#### APIs:  
- POST /courses  
- POST /assignments  
- GET /courses/{id}/content  

#### Student Interaction Service
- Highlight(id, user_id, section_id, start_offset, end_offset)  
- Bookmark(id, user_id, content_id)  
- HintUsage(id, user_id, annotation_id, timestamp)  

## 4. Frontend Design

### 4.1 Technology Stack
- React or Next.js  
- TypeScript  
- Tailwind CSS (UI styling)  

### 4.2 Key UI Components
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
