CREATE IF NOT EXISTS simple_form_snodec;
USE simple_form_snodec;

DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS topic;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(40) NOT NULL,
    password_salt VARCHAR(36) UNIQUE DEFAULT UUID(),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topic (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_account_id BIGINT NOT NULL REFERENCES user_account(id)
);

CREATE TABLE thread (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    topic_id BIGINT NOT NULL REFERENCES topic(id),
    user_account_id BIGINT NOT NULL REFERENCES user_account(id)
);

CREATE TABLE comment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    thread_id BIGINT NOT NULL REFERENCES thread(id),
    user_account_id BIGINT NOT NULL REFERENCES user_account(id)
);