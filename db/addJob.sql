insert into jobs (
    uid,
    today,
    jobdate,
    city,
    state,
    comments,
    bid,
    jobname
    )
values($1, $2, $3, $4, $5, $6, $7, $8)
returning *;

-- insert into jobs (
--    comments
--    , city
--    , state
--    , today
--    , jobdate
--    , jobname
--    , bid
--    , uid
--     )
-- values ('no comments', 'redcity', 'utah', '01-01-2020', '01-01-2030', 'jobnametest', 1, 49)
-- returning *;