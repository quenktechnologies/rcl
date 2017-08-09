
# Route Configuration Language

## Example

```rcl

%import refresh,check from "app/middleware"
%import search,create,update,Users from "app/users"

GET     /users = refresh | search
POST    /users = refresh | create
PUT     /users/:id = refresh | check('admin') | update
DELETE  /users/:id = refresh | check('admin', 'remove') | Users.delete

```

## License

Apache 2.0 (SEE LICENSE) file. (c) Quenk Technologies Limited.
