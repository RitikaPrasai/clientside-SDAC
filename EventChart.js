import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const EventChart = ({ filteredEvents }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const [timeInterval, setTimeInterval] = useState('minute'); // minute, hour, month, year
  const [chartType, setChartType] = useState('line'); // line, bar

  const groupEvents = (events, interval) => {
    const grouped = {};

    events.forEach((event) => {
      const timestamp = new Date(event.timestamp);
      if (isNaN(timestamp)) {
        console.warn(`Invalid timestamp: ${event.timestamp}`);
        return;
      }

      let roundedTimestamp;

      switch (interval) {
        case 'hour':
          timestamp.setMinutes(0, 0, 0);
          break;
        case 'month':
          timestamp.setDate(1);
          timestamp.setHours(0, 0, 0, 0);
          break;
        case 'year':
          timestamp.setMonth(0);
          timestamp.setDate(1);
          timestamp.setHours(0, 0, 0, 0);
          break;
        case 'minute':
        default:
          const minutes = timestamp.getMinutes();
          const roundedMinutes = Math.floor(minutes / 15) * 15;
          timestamp.setMinutes(roundedMinutes, 0, 0);
          break;
      }

      const intervalKey = timestamp.toLocaleString(); // Convert to string format

      if (!grouped[intervalKey]) {
        grouped[intervalKey] = 0;
      }

      grouped[intervalKey] += 1;
    });

    return grouped;
  };

  const generateChartData = () => {
    const groupedEvents = groupEvents(filteredEvents, timeInterval);
    const labels = Object.keys(groupedEvents);
    const data = Object.values(groupedEvents);

    return {
      labels: labels,
      datasets: [
        {
          label: `File Events Over Time (${timeInterval})`,
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: chartType === 'line' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.5)',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    const ctx = document.getElementById('eventChart').getContext('2d');
    const chartData = generateChartData();

    const newChartInstance = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Use string-based category scale
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Event Count' },
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
    return () => {
      newChartInstance.destroy();
    };
  }, [filteredEvents, timeInterval, chartType]);

  return (
    <div>
      <h3>Event Visualization ({timeInterval} Intervals)</h3>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Interval:
          <select onChange={(e) => setTimeInterval(e.target.value)} value={timeInterval}>
            <option value="minute">15-Minute</option>
            <option value="hour">Hourly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </label>
        <label style={{ marginLeft: '10px' }}>
          Chart Type:
          <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
          </select>
        </label>
      </div>

      {/* Chart */}
      <canvas id="eventChart" width="400" height="100"></canvas>
    </div>
  );
};

export default EventChart;
