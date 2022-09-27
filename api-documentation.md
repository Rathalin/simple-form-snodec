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
  user_account_id: string
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
  }
}
```
#### 400 Bad Request
When body param **title** or **description** is missing.

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
  },
  topic: {
    uuid: string
    title: string
  }
  comments: [
    {
      uuid: string
      content: string
      created_at: string
      user: {
        uuid: string
        username: string
        color_hex: string
      }
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
  topicUuid: string
  user_account_id: string
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
  }
}
```
#### 400 Bad Request
When body param **title** or **topicUuid** is missing.

## Create comment
Creates a comment. Responds with the newly created comment.
### Request
```
POST /comment
```
```ts
{
  content: string
  threadUuid: string
  user_account_id: string
}
```
### Response
#### 200 OK
```ts
{
  uuid: string
  content: string
  created_at: string
  user: {
    uuid: string
    username: string
    color_hex: string
  }
}
```
#### 400 Bad Request
When body param **content** or **threadUuid** is missing.
