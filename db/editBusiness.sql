update businesses 
SET  (businessname, link, logo) = ($2, $3, $4)
where bid = $1;