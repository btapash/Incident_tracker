# Incident Tracker

A full-stack Incident Management System built with Spring Boot (Backend) and React (Frontend).

The application allows users to create, view, filter, and update incidents with support for pagination, sorting, and search.

---

## Tech Stack

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL

### Frontend
- React.js
- Tailwind CSS
- Axios

---

## Setup & Run Instructions

### Backend Setup

1. Navigate to backend folder:

2. Configure PostgreSQL in `application.yml`:

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/incident_db
    username: your_username
    password: your_password

  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true

3. Run the application
mvn spring-boot:run

4. Backend will start at http://localhost:8080

### Frontend Setup
1. Navigate to frontend

2. Install the dependencies
npm install

3. Start the app
npm start

4. Frontend will run at http://localhost:3000	

API Overview----
1. Base url
http://localhost:8080/api/incidents

2. Create Incident
POST /api/incidents

3. Get all incidents
GET /api/incidents?page=0&size=5&status=&service=&severity=&search=&sortBy=createdAt&direction=desc

4. Get incident by id
GET /api/incidents/{id}

5. Update incidents
PATCH /api/incidents/{id}

Design Decisions & Tradeoffs------
## Backend

1. Used Spring Data JPA with dynamic predicates for filtering instead of multiple query methods
2. Implemented server-side pagination and sorting for scalability
3. Used DTO pattern to separate request/response from entity
4. Indexed frequently queried fields (status, service, createdAt) for performance

Tradeoff:
Used JPA Specifications (slightly complex) instead of simple queries for flexibility

## Frontend

1. Used debounced search to reduce API calls
2. Implemented server-side filtering and pagination
3. Designed UI using Tailwind CSS for modern look
4. Used controlled components + validation for forms

Tradeoff:
Minimal state management (no Redux) to keep implementation simple

UX Decisions
1. Search is debounced (auto trigger)
2. Filters are applied via button click
3. Pagination shows page numbers + current page info
4. Clickable rows for quick navigation

###Improvements
#Backend
1. Add authentication & authorization (JWT)
2. Add global exception handling with standardized responses
3. Implement caching (Redis) for frequently accessed data
4. Add unit & integration tests

#Frontend
1. Add loading skeletons for better UX
2. Add sorting indicators
3. Add "No results found" UI
4. Add page size selector (5 / 10 / 20)

#Devops
Deploy on cloud like AWS or Vercel




