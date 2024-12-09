import React, { useState, useEffect } from 'react';
import EventFilters from './EventFilters';
import EventTable from './EventTable';
import EventChart from './EventChart';
import EventAggregationFilter from './EventAggregationFilter';

const Dashboard = () => {
  const eventSources = ['SOHO', 'IRIS', 'SDO']; // Fixed list of event sources
  const sourceLabels = { 'SOHO': 1, 'IRIS': 2, 'SDO': 3 }; // Mapping sources to numeric labels

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventSource, setEventSource] = useState(''); // New state for event source filter
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [timestampFilter, setTimestampFilter] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [aggregationFilter, setAggregationFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventSourceInfo, setEventSourceInfo] = useState({}); // Track event source info

  // Fetch events
  useEffect(() => {
    fetch("http://127.0.0.1:8001/events")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.watchdog_events.map(event => ({
          id: event[0],
          event_type: event[1],
          file_name: event[2],
          file_count: event[3],
          timestamp: event[4],
          data_label: event[5],  // Assuming data_label is in position 5
        }));

        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);  // Initially, show all events
        setEventTypes([...new Set(formattedEvents.map(event => event.event_type))]); // Get unique event types
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch events.");
        setLoading(false);
      });
  }, []);

  // Function to calculate the total files and last download time for each event source
  const calculateEventSourceInfo = () => {
    const info = {};

    filteredEvents.forEach((event) => {
      const source = Object.keys(sourceLabels).find((key) => sourceLabels[key] === event.data_label);

      if (!source) return; // Skip if source is not found

      // Initialize info for this source if it doesn't exist
      if (!info[source]) {
        info[source] = {
          totalFiles: 0,
          lastDownload: null,
        };
      }

      // Accumulate the file count for this source
      info[source].totalFiles += event.file_count;

      // Update the last download timestamp (latest event)
      const eventTimestamp = new Date(event.timestamp);
      if (!info[source].lastDownload || eventTimestamp > new Date(info[source].lastDownload)) {
        info[source].lastDownload = event.timestamp;
      }
    });

    setEventSourceInfo(info);
  };

  // Apply filters
  const filterEvents = () => {
    let filtered = [...events];

    // Filter by event source (mapped by data_label)
    if (eventSource) {
      const label = sourceLabels[eventSource];  // Get the numeric label for the selected event source
      filtered = filtered.filter(event => event.data_label === label);  // Filter events by the label
    }

    // Filter by event type
    if (eventTypeFilter) {
      filtered = filtered.filter(event => event.event_type === eventTypeFilter);
    }

    // Filter by timestamp range
    if (timestampFilter.start && timestampFilter.end) {
      const startTimestamp = new Date(timestampFilter.start);
      const endTimestamp = new Date(timestampFilter.end);

      filtered = filtered.filter((event) => {
        const eventTimestamp = new Date(event.timestamp);
        return eventTimestamp >= startTimestamp && eventTimestamp <= endTimestamp;
      });
    }

    // Handle aggregation filter logic
    if (aggregationFilter) {
      filtered = aggregateDataByTime(filtered, aggregationFilter);
    }

    setFilteredEvents(filtered);
    calculateEventSourceInfo(); // Recalculate event source info after filtering
  };

  // Reset Filters
  const resetFilters = () => {
    setFilteredEvents(events); // Reset the filtered events to the original data
    setEventSource('');
    setEventTypeFilter('');
    setTimestampFilter('');
    setAggregationFilter('');
    calculateEventSourceInfo(); // Recalculate event source info after resetting
  };

  // Aggregation logic
  const aggregateDataByTime = (data, timeFrame) => {
    return data.reduce((acc, event) => {
      const date = new Date(event.timestamp);
      let key;

      if (timeFrame === 'hourly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
      } else if (timeFrame === 'monthly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (timeFrame === 'yearly') {
        key = `${date.getFullYear()}`;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);

      return acc;
    }, {});
  };

  // Loading or error handling
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4"> SDAC Watch </h1>

      {/* Filters */}
      <EventFilters
        eventSources={eventSources} // Pass fixed sources list to the filter component
        eventSource={eventSource}    // Event source filter state
        setEventSource={setEventSource}
        eventTypes={eventTypes}
        eventTypeFilter={eventTypeFilter}
        setEventTypeFilter={setEventTypeFilter}
        timestampFilter={timestampFilter}
        setTimestampFilter={setTimestampFilter}
        filterEvents={filterEvents}
      />

      {/* Event Chart */}
      <EventChart filteredEvents={filteredEvents} />

      <div className="col">
        <button
          className="btn btn-primary"
          style={{ marginTop: "-845px", marginLeft: "980px" }}
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      {/* Event Table */}
      <div style={{display:"flex"}}>
        <EventTable filteredEvents={filteredEvents} />

        {/* Right Section: Event Source Info */}
        <div className="w-25" style={{marginLeft: "3%"}}>
          <h3 className="header-info">Event Source Info</h3>
          <div className="event-source-info">
            {eventSources.map((source) => (
              <ul key={source}>
                <li>{source} - Total Files: {eventSourceInfo[source]?.totalFiles || 0}</li>
                <li>Last Download: {eventSourceInfo[source]?.lastDownload || 'N/A'}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
