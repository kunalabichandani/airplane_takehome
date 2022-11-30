-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
UPDATE
  comments
SET
  status = :updated_status
WHERE
  comment_id = :comment_id;