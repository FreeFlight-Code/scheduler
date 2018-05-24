UPDATE users 
SET (
    firstname, 
    lastname, 
    email, 
    birthday, 
    password, 
    comments,  
    bid ) = 
values ($2, $3, $4, $5, $6, $7, $8)
WHERE uid = $1;
returning *;