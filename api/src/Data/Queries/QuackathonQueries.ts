export const getLatestQuackathonQuery = `
SELECT
    id,
    name,
    challenge,
    due,
    status
FROM
    quackathon
ORDER BY
    id DESC
LIMIT 1;
`