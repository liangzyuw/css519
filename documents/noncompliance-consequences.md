# Noncompliance Consequences

If CoffeeJelly does not follow the important compliance requirements, the platform is risking the trust of stakeholders and users of the application. This includes teachers, students, educational institutions as a whole, and textbook owners. 

This document summarizes possible consequences if compliance requirements are not addressed.

---

## 1. Individual Users (Student and Instructor)

Students and instructors are the most direct users of CoffeeJelly. They rely on the platform to view textbook content and interact with instructional annotations.

### 1.1 Security and Privacy

If the platform does not properly protect student information, students may have their educational activity exposed to unauthorized users. This could include login activity, course enrollment, annotation interactions, textbook access patterns, or future academic performance data. This creates risk under student privacy expectations such as FERPA, which is administered and enforced by the U.S. Department of Education for student privacy protections.

According to Globus Publication Journal, DATA PRIVACY AWARENESS AND COMPLIANCE OF STUDENTS IN ONLINE LEARNING PLATFORMS:
"The analysis of institutional and platform-based documents reveals that ethical considerations-such as fairness, transparency, accountability, and equityare unevenly incorporated into data privacy frameworks."  

Some platforms explicitly describe such principles of consent, these commitments often exist as formal acknowledgment rather than implementations in practice. In addition to acknowledgement, CoffeeJelly as a platform should  utilize privacy-by-design approaches and ethics driven guidelines, as emerging technologies rarely execute them. 

Consequences of improper privacy handling:
- Unauthorized disclosure of student educational information
- Loss of student trust in the platform
- Restrictions on whether schools are willing to use the product

Specific consequences of improper authentication and authorization:
- Students being able to access another course's content
- Students creating or deleting instructor annotations
- Users being able to view textbook materials for a course they are not enrolled in
- Increased support and incident response workload
- Need to reset accounts or invalidate tokens

### 1.2 Accessibility Consequences
If the platform is not accessible, students with disabilities may not be able to use core features such as login, textbook navigation, annotation markers, or dashboard content. 

The Department of Justice has issued accessibility requirements for web content and mobile apps provided by state and local governments under ADA Title II, and accessibility expectations are especially important for educational systems.

Consequences of lacking accessibility:
- Some students being unable to access course materials
- Accessibility complaints
- Required redesign of UI components
- Reduced adoption by schools with accessibility requirements

## 2. Educational Institutions 

If the platform fails compliance expectations, schools may face risk from using it.

### 2.1 Security and Privacy
If CoffeeJelly mishandles student data, institutions may be held responsible for using a system that does not adequately protect educational records. Even if CoffeeJelly is operated by a third-party vendor, institutions need confidence that the platform supports privacy, access control, and data minimization.

Consequences of improper security and privacy include:
- Loss of institutional trust, leading to contract cancellation or non-renewal
- Requirement for additional security review before adoption. This also includes security incident investigations and increased administrative burden=
- Requirement to add audit logging, role-based access control, and incident response processes

### 2.2 Operational Consequences
If CoffeeJelly does not maintain basic operational visibility, institutions may not trust it for classroom use.

Consequences of operational issues:
- Inability to diagnose outages quickly
- Poor support experience for instructors and students
- Difficulty proving what happened during an incident


## 3. Textbook Owners and Copyright Licensing
CoffeeJelly displays textbook-style educational content. If the platform uses real textbook content without proper permission, licensing, or attribution, it may create copyright and business liability risk.

The U.S. Copyright Office explains copyright infringement remedies under federal law, including damages, profits, costs, and attorney’s fees in some cases. 

### 3.1 Content Misuse
If copyrighted textbook material is uploaded or displayed without authorization, textbook owners may object to the use of their content.

Consequences include:
- Copyright takedown requests
- Loss of access to licensed content and required removal of textbook material from the platform
- Legal disputes with publishers or authors
- Financial liability

### 3.2 Business Relationship Consequences
If CoffeeJelly wants to partner with schools, publishers, or textbook providers, poor licensing practices can harm those relationships.

Possible consequences include:
- Publishers refusing to license content
- Schools refusing to adopt the platform
- Damage to the product’s credibility as an educational platform

### 3.3 Application-Specific Risk

For CoffeeJelly, this means future versions should track:
- Whether textbook content is original, licensed, or open educational resource content
- What permissions apply to the content
- Whether attribution is required
- Whether students are allowed to download or redistribute content

## 4. Platform Reputation 
Compliance problems can damage CoffeeJelly's reputation even before formal legal or regulatory action occurs. Educational software depends heavily on trust because it is used by students, instructors, and institutions.

### 4.1 Trust Consequences within General public
Improper development could lead to users believing the platform is unsafe, inaccessible, or careless with educational content. If a platform excludes students with disabilities, exposes student data, or mishandles copyrighted content, it undermines public trust in educational technology.

Possible consequences include:
- Schools choosing competing products
- Perception that the platform is not equitable
- Public criticism and concerns from parents or school administrators.
- Stronger scrutiny from institutional decision-makers

Copyright standards also address other compliance requirements. For example, according to "Navigating 21st-Century Digital Scholarship: Open Educational Resources (OERs), Creative Commons, Copyright, and Library Vendor Licenses": 
- CCLs also meet U.S. and international copyright standards...a standard legal code approved by attorneys, a human-readable code available for the average person’s comprehension, and a machine-readable code that includes a summary of key freedoms and obligations that are written into a format that software, search engines, and other technologies can understand.

## 5. Business / Liability Interest
From a business perspective, noncompliance can create financial, legal, and operational consequences. Even if the current version of CoffeeJelly is a mock prototype, the same categories of risk would matter in a production educational platform.

### 5.1 Business Consequences
Possible business consequences include:
- Increased legal review costs and security remediation costs
- Delays in product launch
- Loss of publisher or textbook partnerships
- Reduced investor or stakeholder confidence

### 5.2 Liability Consequences

Possible liability consequences include:
- Privacy complaints related to student data
- Accessibility complaints related to unequal access
- Copyright infringement claims
- Security breach response obligations

### 5.3 Development Consequences

Ignoring compliance early can also make the system harder to improve later. For example, if access control, audit logging, and content licensing are not designed into the system, adding them later may require major backend, frontend, and database redesign.

Possible development consequences include:
- Rewriting authentication and authorization logic
- Retrofitting role-based access control
- Reworking database schemas
- Adding audit logs after the fact
- Rebuilding inaccessible UI components
- Replacing unlicensed textbook content

## 6. References
https://globusjournal.com/wp-content/uploads/2026/02/GMIT-JJ26-172-1.-Jessie-Solas.pdf

https://www.ada.gov/resources/web-guidance/

https://www.tandfonline.com/doi/full/10.1080/0361526X.2019.1589893



