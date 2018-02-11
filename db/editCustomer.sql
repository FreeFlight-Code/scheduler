update users
SET (firstname, lastname, email, birthday, password, comments) = 
($2, $3, $4, $5, $6, $7 )
WHERE uid = $1;