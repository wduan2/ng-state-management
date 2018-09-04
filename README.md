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

Angular Notes:
- routing.ts (routing for modules) must be imported after other modules in the 'imports' field of app.module.ts
- \<submodule\>.routing.ts (routing for components of each module) is required

NGXS Notes:
- in NGXS state class any reduce function (with @Action) must not be static
- store.select will return all (current) states in the store
- the name of each state is defined by the 'name' field of @State
- to allow the injection of NGXS store, NgxsModule.forRoot([\<StateClass1\>, \<StateClass2\>]) must be imported in *.module.ts
