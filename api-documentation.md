# REST API Documentation

## Get all topics
Selects all topics and their users.
### Request
```
GET /topic
```
### Response
#### 200 OK
```ts
[
  {
    uuid: string
    title: string
    description: string
    created_at: string
    user: {
      uuid: string
      username: string
    }
  }
]
```

## Get topic with all threads
Selects a topic and its threads. The parameter **uuid** has to match the uuid of the topic.
### Request
```
GET /topic/:uuid
```
### Response
#### 200 OK
```ts
{
  uuid: string
  title: string
  description: string
  created_at: string
  user: {
    uuid: string
    username: string
    color_hex: string
  },
  threads: [
    {
      uuid: string
      title: string
      created_at: string
      user: {
        uuid: string
        username: string
      }
    }
  ]
}
```
#### 400 Bad Request
When param **uuid** is missing.
#### 404 Not Found
When **uuid** doesn't exist.

## Create topic
Creates a topic. Responds with the newly created topic.
### Request
```
POST /topic
```
```ts
{
  title: string
  description: string
}
```
### Response
#### 200 OK
```ts
{
  uuid: string
  title: string
  description: string
  created_at: string
  user: {
    uuid: string
    username: string
    color_hex: string
  }
}
```
#### 400 Bad Request
When body params **title**, **description** are missing.

## Get thread with all comments
Responds with a thread and its comments. The parameter **uuid** has to match the uuid of the thread.
### Request
```
GET /thread/:uuid
```
### Response
#### 200 OK
```ts
{
  uuid: string
  title: string
  created_at: string
  user: {
    uuid: string
    username: string
    color_hex: string
  },
  comments: [
    {
      uuid: string
      content: string
      created_at: string
      thread: Thread
      user: User
    }
  ]
}
```
#### 400 Bad Request
When params **uuid** is missing
#### 404 Not Found
When **uuid** doesn't exist

## Create thread
Creates a thread. Responds with the newly created thread.
### Request
```
POST /thread
```
```ts
{
  title: string
}
```
### Response
#### 200 OK
```ts
{
  uuid: string
  title: string
  created_at: string
  user: {
    uuid: string
    username: string
    color_hex: string
  }
}
```
#### 400 Bad Request
When body param **title** is missing.

## Create comment
Creates a comment. Responds with the newly created comment.
### Request
```
POST /comment
```
```ts
{
  content: string
}
```
### Response
#### 200 OK
```ts
{
  uuid: string
  content: string
  user: {
    uuid: string
    username: string
    color_hex: string
  }
}
```
#### 400 Bad Request
When body param **content** is missing.
