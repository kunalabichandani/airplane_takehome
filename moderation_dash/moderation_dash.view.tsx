import { Stack, Table, Text, Card, Button, Title, Chart, useComponentState } from "@airplane/views";
import React from "react";

// Put the main logic of the view here.
// Views documentation: https://docs.airplane.dev/views/getting-started
const ModerationDashboard = () => {
  const comments = useComponentState("comments");
  const selectedComment = comments.selectedRow;

  return (
    <Stack>
      <Title order={3}>Comment Moderation Dashboard</Title>

      {/* My line chart implementation is also having issues :( */}
      {/* <Stack direction="row" spacing="xl">
          <Chart
            title="Unique customers per week"
            type="line"
            task="comment_line_chart"
            width={{ xs: "100%", lg: "50%" }}
            outputTransform={(o) => o.Q1}
            xAxisTitle="Week"
            yAxisTitle="Customers"
            legendPosition="hidden"
          /> */}

      {/* There is a bug in my pie chart implementation that sometimes mismatches the labes of each slice of the pie. */}
      {/* <Chart width="1/2" type="pie" task="status_pie" outputTransform={(o) => o.Q1} labels={["Approved", "Pending", "Rejected"]}/> */}
      {/* </Stack> */}

      <Table
        id="comments"
        title="Comments"
        // columns={customersCols}
        task={{
          slug: "get_comments",
          params: {},
        }}
        rowSelection="single"
        showFilter={false}
        columns={commentsCols}
        hiddenColumns={["comment_id", "created_by", "flagged_by"]}
      />
      {selectedComment &&
        <CommentDetail comment={selectedComment} />
      }
    </Stack>
  );
};

const CommentDetail = ({ comment }) => {
  const commentDetail = ` **Comment ID:** ${comment.comment_id} \n
**Created By:** ${comment.created_by} \n
**Comment Text:** ${comment.comment_text} \n
**Created On:** ${comment.created_at} \n
**Flagged By:** ${comment.flagged_by} \n
**Priority:** ${comment.priority} \n
**Status:** ${comment.status}
`;
  return (
    <Card>
      <Text>{commentDetail}</Text>
      <Stack direction="row">
        <Button
          task={{
            slug: "update_comment_status",
            params: { comment_id: comment.comment_id, updated_status: "Approved" },
            refetchTasks: "get_comments"
          }}
          disabled={comment.status === "Approved"}
        >
          Approve
        </Button>
        <Button
          task={{
            slug: "update_comment_status",
            params: { comment_id: comment.comment_id, updated_status: "Rejected" },
            refetchTasks: "get_comments"
          }}
          preset="secondary"
          disabled={comment.status === "Rejected"}
        >
          Reject
        </Button>
      </Stack>
    </Card>
  )
}

const commentsCols = [
  {
    label: "Comment",
    accessor: "comment_text",
  },
  {
    label: "Created",
    accessor: "created_at",
  },
  {
    label: "Priority",
    accessor: "priority",
  },
  {
    label: "Status",
    accessor: "status",
  },
];

export default ModerationDashboard;
