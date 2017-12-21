INSERT INTO businesses (
  businessname,
  link,
  logo
)
VALUES (
$1,
$2,
$3
) returning *;
