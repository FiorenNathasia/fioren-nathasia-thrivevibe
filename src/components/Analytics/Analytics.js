import { PieChart } from "@mui/x-charts/PieChart";

function Analytics({ upvotes, downvotes }) {
  if (!upvotes && !downvotes) {
    return <div>No votes to display</div>;
  }

  const totalVotes = upvotes + downvotes;

  const upvotePercentage = (upvotes / totalVotes) * 100;
  const downvotePercentage = (downvotes / totalVotes) * 100;

  return (
    <PieChart
      colors={["#2A42C6", "#F3729D"]}
      series={[
        {
          data: [
            { id: 0, value: upvotePercentage, label: "Upvotes %" },
            { id: 1, value: downvotePercentage, label: "Downvotes %" },
          ],
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { additionalRadius: -30, color: "gray" },
        },
      ]}
      width={450}
      height={250}
    />
  );
}

export default Analytics;
