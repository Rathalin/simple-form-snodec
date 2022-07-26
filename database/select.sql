USE simple_form_snodec;

SELECT c.content 'Comment', th.title 'Thread', t.title 'Topic'
FROM comment c 
JOIN thread th 
    ON c.thread_id = th.id 
JOIN topic t 
    ON th.topic_id = t.id;

SELECT username, email, color_hex, created_at
FROM user_account;
