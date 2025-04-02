# Music Booking Application

## Description

### Task:
Develop an API for a Music Booking App, handling artist profiles, event listings, and booking transactions.

### Deliverables: 
GitHub repo with well-structured API endpoints (REST or GraphQL), database schema, and Postman collection for testing.

### Key Skills Assessed: 
API Design, Security, Scalability, Database Architecture.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Design Considerations

### Database
SQLite was used for setup simplicity.

### Authentication
- Endpoint for password reset was not provided 

### Architecture
- An event is only owned by one artist though another artist could be invited
- It has been assumed that there would not be race condition when booking tickets for simplicity. This would not hold for popular events. To cater for that if time permits, i would integrated pub/sub with redis by pushing booking request first to redis until payment is completed. Each ticket without payment completion within a given time-frame would be released and booking canceled. Other-wise, request is saved to booking table


## Todo
- Add search in ELK stack
- Input validation especially of missing required input
- General database error handling
- Adding filters to queries
- Make event price return type a decimal instead of string
- Add pagination 
- Add jwt token refresh and Http-only cookie