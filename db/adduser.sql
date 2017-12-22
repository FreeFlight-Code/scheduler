insert into users (
    email, 
    password, 
    firstname, 
    lastname, 
    birthday, 
    comments, 
    auth, 
    bid )
values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;
