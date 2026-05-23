# Complience Requirements

Since CoffeeJelly functions like an educational platform, it may handle student information, classroom activity, instructor-authored content, textbook materials, authentication data, and operational metrics. These assets create compliance responsibilities related to privacy, accessibility, copyright, security, and auditability.

---

## 1. Protected Parties and Interests

### 1.1 Students

Students are protected because the platform may process information related to their learning activity, course access, login history, annotation views, and possibly assignments or performance in future versions. Some student interests include:

- Privacy of educational records
- Equal access to course content
- Protection from unauthorized disclosure
- Secure authentication
- Fair and reliable platform availability

### 1.2 Instructors

Instructors are protected because the platform stores instructor-created annotations and course-related teaching material. Interests include:

- Integrity of annotations: protection of intellectual contributions and access to teaching tools
- Prevention of unauthorized modification or deletion

### 1.3 Educational Institutions 

In a general sense:

- Avoiding misuse of student data
- Reducing liability from privacy violations
- Protecting copyrighted textbook content
- Demonstrating responsible security practices
- Maintaining operational reliability

### 1.4 Textbook Authors and Publishers

Textbook owners would want to reserve their rights to their own material, and make sure their content is not given to those without purposeful access (students and instructors)

### 1.5 General Public

- Responsible use of educational technology
- Protection of minors and students
- Accessibility for users with disabilities
- Respect for copyrighted educational content
- Transparent handling of data and platform risks

## 2. Compliance Requirement - Student Privacy / FERPA 

FERPA is the The Family Educational Rights and Privacy Act, which protects the privacy of student education records. The U.S. Department of Education administers and enforces FERPA-related student privacy requirements. FERPA can become relevant when an educational platform stores or processes personally identifiable student information connected to a school, course, enrollment, academic activity, or educational record.

### 2.1 What is protected

Product should protect:

- Student names
- Student emails
- Course enrollments
- Login/session records
- Assignment activity
- Annotation requests or interactions

### 2.2 Business / Liability Interest

Failure to protect student education records could expose the organization to institutional liability, loss of trust, school contract termination, or regulatory review.

### 2.3 Customer Interest

Schools, instructors, and students need confidence that educational activity is not exposed to unauthorized users.

### 2.4 Security Requirements

- Require authentication before accessing course content
- Restrict access to course materials by enrollment
- Avoid exposing student identifiers unnecessarily
- Avoid using student data for unrelated purposes

## 3. Compliance Requirement - Accessibility / ADA
Educational platforms should be accessible to users with disabilities. ADA.gov explains that websites and mobile apps may need to be accessible so people with disabilities can access goods, services, programs, or activities. The Department of Justice has also issued rules and guidance addressing web and mobile accessibility requirements for public entities and accessibility expectations for web content. 

### 3.1 Product should protect equal access to:
- Login pages
- Textbook content
- Annotation markers
- Dashboard pages
- Course navigation

This would concern:
- Students with visual, auditory, motor, or cognitive disabilities
- Instructors with disabilities
- Public users accessing institutional educational services

### 3.2 Business/Liability and Customer Interest
Accessibility failures may create legal exposure, institutional complaints, reputational damage, and exclusion of students who rely on assistive technology.  

Schools and instructors need tools that can be used by all students, not only students without disabilities.

Design suggestions for future consideration:
- Support keyboard navigation
- Use readable color contrast
- Avoid relying only on color to communicate status
- Provide semantic HTML structure
- Use labels for form fields
- Make annotation markers screen-reader friendly
- Avoid inaccessible hover-only interactions
- Ensure dashboard charts have text alternatives

## 4. Compliance Requirement - Users' Privacy / COPPA
COPPA is the Children’s Online Privacy Protection Rule applies to operators of websites or online services directed to children under 13, and to operators that have actual knowledge they are collecting personal information from children under 13. The FTC states that COPPA imposes requirements on such operators regarding children’s online privacy. 

### 4.1 Who is protected

- Parents or guardians
- Schools using the platform with minors

### 4.2 If CoffeeJelly is used in K–12, it must protect:
- Child names
- Emails or usernames
- Login identifiers
- Course membership
- Usage data
- Annotation activity

### 4.3 For Security reasons, CoffeeJelly should:

- Avoid unnecessary collection of children’s personal information
- Clearly document what data is collected but limit behavioral tracking
- Avoid advertising-based profiling
- Protect child user data from unauthorized access

## 5. Compliance Requirement 4: Copyright and Textbook Licensing

### 5.1 Copyright / Licensed Educational Content

Product displays textbook-style educational content. If real textbook material is used, the platform must respect copyright and licensing restrictions. The U.S. Copyright Office provides resources on copyright and fair use, including the Fair Use Index, but fair use is context-specific and should not be assumed for full textbook reproduction.

### 5.2 What is protected
- Publisher-owned textbook content
- Instructor-created annotations
- Diagrams, problems, and solutions
- Licensed course material

Unauthorized use of copyrighted textbooks can create legal liability, takedown requests, licensing disputes, and reputational harm.

### 5.3 Who is protected
- Textbook authors
- Publishers
- Instructors
- Educational institutions
- Students who need lawful access to materials

Schools and instructors need confidence that course materials are used lawfully and that student access is not interrupted by copyright disputes.

### 5.4 Security and Content Requirements
- Use original, licensed, open educational resource, or permissioned textbook content
- Track content source and license type and preserve attribution where required
- Limit textbook access to authorized users
- Prevent unauthorized copying or redistribution where applicable


## 6. References
https://studentprivacy.ed.gov/resources/protecting-student-privacy-while-using-online-educational-services-requirements-and-best

https://corehighered.com/en/blog/navigating-compliance-in-higher-education-technology

https://www.ada.gov/resources/small-entity-compliance-guide/

https://elearningindustry.com/the-compliance-checklist-must-have-features-for-every-online-learning-platform

