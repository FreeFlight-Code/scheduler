insert into users (firstname, lastname, email, birthday, password, comments, auth, bid )
values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;