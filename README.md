# RANEPA database a.k.a. RanepaDB

RanepaDB is my term project created to implement 10 queries in a postgreSQL database.

First launch database container with

```
docker-compose up -d db
```
Then restore database from dump with 

```
docker-compose run db pg_restore -d 'postgresql://postgres:123456@db' < ranepaback.sql
```
And finally launch app with 

```
docker-compose up -d app
```

Your app will be available at `localhost:3000`

## Enjoy
