// import React from 'react';

// const EventFilters = ({
//   eventSources, // List of event sources
//   eventSource,  // Current selected event source
//   setEventSource,
//   eventTypes,
//   eventTypeFilter,
//   setEventTypeFilter,
//   timestampFilter,
//   setTimestampFilter,
//   aggregationFilter,
//   setAggregationFilter,
//   filterEvents
// }) => {
//   return (
//     <div className="mb-4">
//       <h3>Filters</h3>
//       <div className="row">
//         {/* Event Source Dropdown */}
//         <div className="col">
//           <select
//             className="form-select"
//             value={eventSource}
//             onChange={(e) => setEventSource(e.target.value)}
//           >
//             <option value="">All Event Source</option>
//             {eventSources.map((source, index) => (
//               <option key={index} value={source}>
//                 {source}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Event Type Dropdown */}
//         <div className="col">
//           <select
//             className="form-select"
//             value={eventTypeFilter}
//             onChange={(e) => setEventTypeFilter(e.target.value)}
//           >
//             <option value="">All Events</option>
//             {eventTypes.map((eventType, index) => (
//               <option key={index} value={eventType}>
//                 {eventType}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Timestamp Input */}
//         <div className="col">
//           <input
//             type="text"
//             className="form-select"
//             placeholder="yyyy-mm-dd"
//             value={timestampFilter}
//             onChange={(e) => setTimestampFilter(e.target.value)}
//           />
//         </div>

//         {/* Apply Filter Button */}
//         <div className="col">
//           <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); filterEvents(); }}>
//             Apply Filters
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventFilters;


// import React, { useEffect } from 'react';

// const EventFilters = ({
//   eventSources, // List of event sources
//   eventSource,  // Current selected event source
//   setEventSource,
//   eventTypes,
//   eventTypeFilter,
//   setEventTypeFilter,
//   timestampFilter,
//   setTimestampFilter,
//   aggregationFilter,
//   setAggregationFilter,
//   filterEvents,
//   defaultSource, // Default event source (IRIS)
//   setDefaultSource, // Function to update default source
// }) => {
//   // Automatically set the default source when eventSources change or when the defaultSource is updated
//   useEffect(() => {
//     if (!eventSource) {
//       setEventSource(defaultSource); // Set default source if no source is selected
//     }
//   }, [defaultSource, eventSource, setEventSource]);

//   return (
//     <div className="mb-4">
//       <h3>Filters</h3>
//       <div className="row">
//         {/* Event Source Dropdown */}
//         <div className="col">
//           <label htmlFor="eventSource" className="form-label">
//             Event Source
//           </label>
//           <select
//             className="form-select"
//             id="eventSource"
//             value={eventSource}
//             onChange={(e) => setEventSource(e.target.value)}
//           >
//             {eventSources.map((source, index) => (
//               <option key={index} value={source}>
//                 {source}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Event Type Dropdown */}
//         <div className="col">
//           <label htmlFor="eventType" className="form-label">
//             Event Type
//           </label>
//           <select
//             className="form-select"
//             id="eventType"
//             value={eventTypeFilter}
//             onChange={(e) => setEventTypeFilter(e.target.value)}
//           >
//             {eventTypes.map((eventType, index) => (
//               <option key={index} value={eventType}>
//                 {eventType}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Timestamp Input */}
//         <div className="col">
//           <label htmlFor="timestamp" className="form-label">
//             Timestamp
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="timestamp"
//             placeholder="yyyy-mm-dd"
//             value={timestampFilter}
//             onChange={(e) => setTimestampFilter(e.target.value)}
//           />
//         </div>

//         {/* Apply Filter Button */}
//         <div className="col">
//           <button
//             className="btn btn-primary"
//             onClick={(e) => {
//               e.preventDefault();
//               filterEvents();
//             }}
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventFilters;

import React, { useEffect } from 'react';

const EventFilters = ({
  eventSources, // List of event sources
  eventSource,  // Current selected event source
  setEventSource,
  eventTypes,
  eventTypeFilter,
  setEventTypeFilter,
  timestampFilter,
  setTimestampFilter,
  aggregationFilter,
  setAggregationFilter,
  filterEvents,
  defaultSource, // Default event source (IRIS)
  setDefaultSource, // Function to update default source
}) => {
  // Automatically set the default source when eventSources change or when the defaultSource is updated
  useEffect(() => {
    if (!eventSource) {
      setEventSource(defaultSource); // Set default source if no source is selected
    }
  }, [defaultSource, eventSource, setEventSource]);

  // Handle the start and end timestamp changes
  const handleStartTimestampChange = (e) => {
    setTimestampFilter((prev) => ({
      ...prev,
      start: e.target.value,
    }));
  };

  const handleEndTimestampChange = (e) => {
    setTimestampFilter((prev) => ({
      ...prev,
      end: e.target.value,
    }));
  };

  return (
    <div className="mb-4">
      <h3>Filters</h3>
      <div className="row">
        {/* Event Source Dropdown */}
        <div className="col">
          <label htmlFor="eventSource" className="form-label">
            Event Source
          </label>
          <select
            className="form-select"
            id="eventSource"
            value={eventSource}
            onChange={(e) => setEventSource(e.target.value)}
            style={{ width: '230px' }}
          >
            <option value="">
              All
            </option>
            {eventSources.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type Dropdown */}
        <div className="col">
          <label htmlFor="eventType" className="form-label">
            Event Type
          </label>
          <select
            className="form-select"
            id="eventType"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            style={{ width: '230px' }}
          >
            <option value="">
              All
            </option>
            {eventTypes.map((eventType, index) => (
              <option key={index} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>

        {/* Timestamp Range Input */}
        <div className="col">
          <label htmlFor="timestamp" className="form-label">
            Timestamp Range
          </label>
          <div className="d-flex">
            {/* Start Timestamp */}
            <input
              type="text"
              className="form-control me-2"
              id="startTimestamp"
              placeholder="Start: yyyy-mm-dd"
              value={timestampFilter.start}
              onChange={handleStartTimestampChange}
              style={{ width: '150px', marginLeft: '-8px' }}

            />
            {/* End Timestamp */}
            <input
              type="text"
              className="form-control"
              id="endTimestamp"
              placeholder="End: yyyy-mm-dd"
              value={timestampFilter.end}
              onChange={handleEndTimestampChange}
              style={{ width: '150px', marginLeft: '6px' }}
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <div className="col">
          <button
            className="btn btn-primary"
            style={{ marginTop: '35px', marginLeft: '-15px' }} // Correct syntax for inline styles
            onClick={(e) => {
              e.preventDefault();
              filterEvents();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;


