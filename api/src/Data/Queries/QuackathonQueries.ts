export const getAllQuackathonsQuery = `
SELECT
    id,
    name,
    challenge,
    due,
    status
FROM
    quackathon;
`
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
`;

export const getQuackathonByIdQuery = `
SELECT
    id,
    name,
    challenge,
    due,
    status
FROM
    quackathon
WHERE
    id = $id
LIMIT 1;
`;

export const getQuackathonByNameQuery = `
SELECT
    id,
    name,
    challenge,
    due,
    status
FROM
    quackathon
WHERE
    name = $name
ORDER BY id DESC;
`;

export const createQuackathonQuery = `
INSERT INTO quackathon (name, challenge, due, status) VALUES (
    $name ,
    $challenge ,
    $due ,
    0
);
`;

export const updateQuackathonQuery = `
UPDATE quackathon
SET
    name = $name ,
    challenge = $challenge ,
    due = $due ,
    status = $status
WHERE
    id = $id
`