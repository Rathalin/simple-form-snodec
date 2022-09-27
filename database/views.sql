CREATE DATABASE IF NOT EXISTS simple_form_snodec;
USE simple_form_snodec;

DROP VIEW IF EXISTS view_topics;
DROP VIEW IF EXISTS view_threads;
DROP VIEW IF EXISTS view_comments;

CREATE VIEW view_topics AS
  SELECT 
    t.uuid `topic_uuid`, 
    t.title `topic_title`, 
    t.description `topic_description`, 
    t.created_at `topic_created_at`, 
    u.uuid `user_uuid`, 
    u.username `user_username`, 
    u.color_hex `user_color_hex`, 
    u.email `user_email`, 
    u.created_at `user_created_at`
    u.id `user_account_id`
  FROM topic t
  JOIN user_account u
    ON t.user_account_id = u.id;

CREATE VIEW view_threads AS
  SELECT 
    th.id `thread_id`,
    th.uuid `thread_uuid`, 
    th.title `thread_title`, 
    th.created_at `thread_created_at`,
    th.topic_id `thread_topic_id`,
    th.user_account_id `thread_user_account_id`,
    u.uuid `user_uuid`, 
    u.username `user_username`, 
  FROM thread th
  JOIN user_account u
    ON th.user_account_id = u.id;

CREATE VIEW view_comments AS
  SELECT 
    c.id `comment_id`,
    c.uuid `comment_uuid`, 
    c.content `comment_content`, 
    c.created_at `comment_created_at`,
    c.thread_id `comment_thread_id`,
    c.user_account_id `comment_user_account_id`,
    u.uuid `user_uuid`, 
    u.username `user_username`, 
    u.color_hex `user_color_hex`, 
  FROM comment c
  JOIN user_account u
    ON c.user_account_id = u.id;