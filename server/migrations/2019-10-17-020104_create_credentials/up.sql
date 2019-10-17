CREATE TABLE credentials (
    id UUID NOT NULL,
	email VARCHAR NOT NULL ,
    user_id INTEGER NOT NULL,
    salt VARCHAR NOT NULL,
    pass_hash VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE (email)
);
