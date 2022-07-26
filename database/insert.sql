-- Active: 1645874165834@@127.0.0.1@3306@simple_form_snodec
USE simple_form_snodec;

DELETE FROM comment;
DELETE FROM thread;
DELETE FROM topic;
DELETE FROM user_account;

# Insert test user Daniel
SET @salt_daniel = UUID();
INSERT INTO user_account(username, email, color_hex, password_hash, password_salt)
VALUES(
    'Daniel Flockert',
    'daniel@flockert.at',
    '#B93F21',
    SHA1(CONCAT(@salt_daniel, 'rathalin')),
    @salt_daniel
);

# Insert test user Philip
SET @salt_philip = UUID();
INSERT INTO user_account(username, email, color_hex, password_hash, password_salt)
VALUES(
    'Philip Toolan',
    'philtoolan@gmail.com',
    '#21B956',
    SHA1(CONCAT(@salt_philip, 'pub')),
    @salt_philip
);

# Insert test user Rita
SET @salt_rita = UUID();
INSERT INTO user_account(username, email, color_hex, password_hash, password_salt)
VALUES(
    'Rita Hainzl',
    'rhainzl@hotmail.com',
    '#2186B9',
    SHA1(CONCAT(@salt_rita, 'linz')),
    @salt_rita
);

# Insert test user Sebastian
SET @salt_rita = UUID();
INSERT INTO user_account(username, email, color_hex, password_hash, password_salt)
VALUES(
    'Sebastian Mayer',
    'mayee.sebastian@gmail.com',
    '#9621B9',
    SHA1(CONCAT(@salt_rita, 'ooe')),
    @salt_rita
);


# Insert topics
INSERT INTO topic(title, description, user_account_id)
VALUES(
    'Cake',
    'Discussions about cake',
    (SELECT id FROM user_account LIMIT 1)
);

INSERT INTO topic(title, description, user_account_id)
VALUES(
    'Soup',
    'Share your thoughts about soup',
    (SELECT id FROM user_account LIMIT 1 OFFSET 1)
);


#Insert threads
INSERT INTO thread(title, topic_id, user_account_id)
VALUES(
    'Sacher Torte',
    (SELECT id FROM topic LIMIT 1),
    (SELECT id FROM user_account LIMIT 1 OFFSET 2)
);


#Insert comments
INSERT INTO comment(content, thread_id, user_account_id)
VALUES(
    'I like Sacher Torte, pretty neat Austrian dish.',
    (SELECT id FROM thread LIMIT 1),
    (SELECT id FROM user_account LIMIT 1 OFFSET 3)
);
