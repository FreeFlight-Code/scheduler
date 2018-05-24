UPDATE jobs 
SET (
    comments
    , city
    , state
    , jobname
    , jobdate
    , bid
    , uid
     ) = 
( $2, $3, $4, $5, $6, $7, $8)
WHERE jid = $1
returning *;