import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.containerId =
      "chartContainer_" + Math.random().toString(36).substring(2, 9);
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.upvotes !== this.props.upvotes ||
      prevProps.downvotes !== this.props.downvotes
    ) {
      this.renderChart();
    }
  }

  renderChart() {
    const { upvotes, downvotes } = this.props;
    const totalVotes = upvotes + downvotes;

    const upvotePercentage = ((upvotes / totalVotes) * 100).toFixed(2);
    const downvotePercentage = ((downvotes / totalVotes) * 100).toFixed(2);

    const options = {
      exportEnabled: true,
      animationEnabled: true,
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            {
              y: parseFloat(upvotePercentage),
              label: "upvotes",
              color: "#4654A3",
            },
            {
              y: parseFloat(downvotePercentage),
              label: "downvotes",
              color: "#F07799",
            },
          ],
        },
      ],
    };
    console.log(options);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new CanvasJS.Chart(this.containerId, options);
    this.chart.render();
  }

  render() {
    return <div id={this.containerId}></div>;
  }
}

export default PieChart;
