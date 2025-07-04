# Portfolio Application - Deployment Guide

## Overview

This document provides instructions for deploying the Portfolio application, which consists of:

- **Frontend**: Next.js application (React + TypeScript)
- **Backend**: Spring Boot application (Java)
- **Database**: PostgreSQL

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Java 17+ (for local development)
- Git

## Environment Variables

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Spotify Integration (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Email Configuration (Optional)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### Backend (application.properties)

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=postgres
spring.datasource.password=your_secure_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Security Configuration
spring.security.user.name=Gideon
spring.security.user.password=Pw123rat!
```

## Local Development

### 1. Start the Database

```bash
docker-compose up postgres -d
```

### 2. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Start the Frontend

```bash
cd portfolio
npm install
npm run dev
```

### 4. Run Tests

```bash
# Frontend tests
cd portfolio
npm test

# Backend tests
cd backend
./mvnw test
```

## Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

```bash
git clone <repository-url>
cd Portfolio-3
```

2. **Set environment variables**

```bash
export POSTGRES_PASSWORD=your_secure_password
```

3. **Build and start all services**

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

4. **Verify deployment**

```bash
# Check if all containers are running
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Option 2: Manual Deployment

#### Frontend Deployment

1. **Build the application**

```bash
cd portfolio
npm install
npm run build
```

2. **Start the production server**

```bash
npm start
```

#### Backend Deployment

1. **Build the application**

```bash
cd backend
./mvnw clean package -DskipTests
```

2. **Run the JAR file**

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Performance Optimizations

### Frontend

- ✅ Image optimization with WebP/AVIF formats
- ✅ CSS optimization
- ✅ Package import optimization
- ✅ Compression enabled
- ✅ Security headers configured

### Backend

- ✅ JVM optimizations for containers
- ✅ Connection pooling
- ✅ CORS configuration
- ✅ Security configuration

## Monitoring and Health Checks

### Health Check Endpoints

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080/actuator/health`

### Logs

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f backend
```

## Security Considerations

### Environment Variables

- Never commit sensitive data to version control
- Use environment variables for all secrets
- Rotate passwords regularly

### Network Security

- Use HTTPS in production
- Configure proper CORS settings
- Implement rate limiting

### Database Security

- Use strong passwords
- Limit database access
- Regular backups

## Troubleshooting

### Common Issues

1. **Port conflicts**

```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8080
lsof -i :5432
```

2. **Database connection issues**

```bash
# Check if PostgreSQL is running
docker-compose -f docker-compose.prod.yml ps postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

3. **Build failures**

```bash
# Clean and rebuild
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Performance Issues

- Monitor memory usage
- Check for memory leaks
- Optimize database queries
- Use caching where appropriate

## Backup and Recovery

### Database Backup

```bash
# Create backup
docker exec portfolio-postgres-prod pg_dump -U postgres portfolio_db > backup.sql

# Restore backup
docker exec -i portfolio-postgres-prod psql -U postgres portfolio_db < backup.sql
```

### Application Data

- Backup environment variables
- Backup configuration files
- Document deployment procedures

## Scaling Considerations

### Horizontal Scaling

- Use load balancers
- Implement session management
- Configure database clustering

### Vertical Scaling

- Increase container resources
- Optimize JVM settings
- Monitor resource usage

## Maintenance

### Regular Tasks

- Update dependencies
- Security patches
- Performance monitoring
- Log rotation
- Database maintenance

### Updates

1. Pull latest changes
2. Update environment variables if needed
3. Rebuild containers
4. Test thoroughly
5. Deploy with zero downtime

## Support

For issues and questions:

- Check the troubleshooting section
- Review logs for error messages
- Test in development environment first
- Document any new issues and solutions
