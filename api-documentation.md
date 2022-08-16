# REST API Documentation

## Get all topics
### Request
```HTTP
GET /topic
```
### Response
```TypeScript
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

## Get all thread of topic
### Request
```HTTP
GET /topic/:id
```
### Response
```TypeScript
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

<!-- ## Schemas

### User
```TypeScript
interface User {
  uuid: string
  username: string
  color_hex: string
  email: string
  created_at: string
}
```

### Topic
```TypeScript
interface Topic {
  uuid: string
  title: string
  description: string
  created_at: string
  user: User
}
```

### Thread
```TypeScript
interface Thread {
  uuid: string
  title: string
  created_at: string
  topic: Topic
  user: User
}
```

### Comment
```TypeScript
interface Comment {
  uuid: string
  content: string
  created_at: string
  thread: Thread
  user: User
}
``` -->
