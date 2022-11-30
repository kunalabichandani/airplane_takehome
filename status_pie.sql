-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT COUNT(comment_id), status FROM comments GROUP BY status ORDER BY status ASC
