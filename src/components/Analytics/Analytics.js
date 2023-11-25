import { PieChart } from "@mui/x-charts/PieChart";

function Analytics({ upvotes, downvotes }) {
  if (!upvotes && !downvotes) {
    return <div>No votes to display</div>;
  }

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: upvotes, label: "Upvotes" },
            { id: 1, value: downvotes, label: "Downvotes" },
          ],
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default Analytics;
