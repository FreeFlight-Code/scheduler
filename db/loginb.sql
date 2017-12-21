SELECT 
Businesses.businessname, 
Businesses.logo, 
Businesses.link, 
users.uid, 
users.firstname, 
users.lastname, 
users.email, 
users.birthday, 
users.password,
users.comments,
users.auth, 
users.bid 
FROM users
Right JOIN businesses ON users.bid=businesses.bid
WHERE users.email = $1;