-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  date_trunc(
    'week',
    CAST(comments.created_at AS timestamp)
  ):: date AS week,
  count(DISTINCT comment_id) AS cnt,
  status
FROM
  comments
GROUP BY
  week, status
ORDER BY
  week DESC;
