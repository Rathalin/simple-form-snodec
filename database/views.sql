CREATE DATABASE IF NOT EXISTS simple_form_snodec;
USE simple_form_snodec;

DROP VIEW IF EXISTS view_topics;

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
  FROM topic t
  JOIN user_account u
    ON t.user_account_id = u.id;
