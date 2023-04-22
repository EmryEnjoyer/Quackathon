
export const queries = {
    createStatusEnum: `
    CREATE TABLE IF NOT EXISTS quackathon_status (
        id INTEGER PRIMARY KEY,
        status VARCHAR(100)
    );
    `,
    populateStatusEnum: `
    INSERT OR REPLACE INTO quackathon_status VALUES
        (0, 'Scheduled'),
        (1, 'In progress'),
        (2, 'Completed'),
        (3, 'Cancelled');
    `,
    createQuackathon: `
    CREATE TABLE IF NOT EXISTS quackathon (
        id INTEGER PRIMARY KEY NOT NULL DEFAULT rowid,
        name VARCHAR(350) NOT NULL DEFAULT 'Quackathon',
        boilerplate TEXT NOT NULL DEFAULT '',
        challenge TEXT NOT NULL DEFAULT '',
        due INTEGER NOT NULL,
        status INTEGER NOT NULL REFERENCES quackathon_status(id) DEFAULT 0
    );
    `,
    createQuackathonDueIndex: `
    CREATE INDEX IF NOT EXISTS ix_quckathon_due ON quackathon(due);
    `,
    createSpecialCondition: `
    CREATE TABLE IF NOT EXISTS special_conditions (
        id INTEGER PRIMARY KEY NOT NULL DEFAULT rowid,
        quackathon_id INTEGER NOT NULL REFERENCES QUACKATHON(id),
        condition TEXT NOT NULL
    );
    `,
    createTeam: `
    CREATE TABLE IF NOT EXISTS team (
        id PRIMARY KEY NOT NULL DEFAULT rowid,
        name VARCHAR(350) NOT NULL UNIQUE,
        quackathon_id INTEGER NOT NULL REFERENCES quackathon(id),
        owner_id INTEGER NOT NULL,
        repo_url TEXT,
        deploy_url TEXT,
        submitted INTEGER NOT NULL DEFAULT 0 CHECK(submitted = 0 OR submitted = 1),
        is_victor INTEGER NOT NULL DEFAULT 0 CHECK(is_victor = 0 OR is_victor = 1),
        is_active ITNEGER NOT NULL default 1 CHECK(is_active = 0 OR is_active = 1)
    );
    `,
    createTeamQuackathonIdIndex: `
    CREATE INDEX IF NOT EXISTS ix_team_quackathon_id ON team(quackathon_id);
    `,
    createTeamOwnerIdIndex: `
    CREATE INDEX IF NOT EXISTS ix_team_owner_id ON team(owner_id);
    `,
    createTeamMembership: `
    CREATE TABLE IF NOT EXISTS team_membership (
        team_id INTEGER NOT NULL REFERENCES team(id),
        user_id INTEGER NOT NULL,
        PRIMARY KEY (team_id, user_id)
    );
    `,
    createTeamInvitation: `
    CREATE TABLE IF NOT EXISTS team_invite (
        team_id INTEGER NOT NULL REFERENCES team(id),
        user_id INTEGER NOT NULL,
        is_alive INTEGER NOT NULL DEFAULT 0 CHECK (is_alive = 0 OR is_alive = 1),
        PRIMARY KEY (team_id, user_id)
    );
    `
}