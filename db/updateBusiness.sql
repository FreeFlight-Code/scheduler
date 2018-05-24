UPDATE businesses
SET (
    businessname
    , link
    , logo
     ) = 
values ( $2, $3, $4 )
WHERE bid = $1
returning *;