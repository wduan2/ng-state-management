Types of State:
- Server state
    - stored on the server and is provided via, e.g. REST endpoint
- Persistent state
    - server state stored on the client    
- Client state
    - state stored on the client
- URL and Router state
- Transient Client state    
    - not represent in the URL
- Local UI state

```
  ______________
 |              |
 | Server state |
 |______________|
         |
         V
 _________________      ______________     __________________
|                 |    |              |   |                  |
| Persisten state |    | Client state |   | Transient Client | 
|_________________|    |______________|   |      state       | 
              \              /            |__________________|
               \            /               
        _________________________           ________________
       |                         |         |                | 
       |       URL / Router      |         | Local UI state |
       |_________________________|         |________________|
```

Rules:
- Separate services/computation from state management
- Optimistic updates require separate actions to deal with errors
- Use immutable data for persistent and client state
