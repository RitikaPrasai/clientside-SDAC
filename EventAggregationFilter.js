import React from 'react';

const EventAggregationFilter = ({ aggregationFilter, setAggregationFilter }) => {
  return (
    <div className="mb-4">
      <h3>Aggregation</h3>
      <div className="row">
        <div className="col">
          <select
            className="form-select"
            value={aggregationFilter}
            onChange={(e) => setAggregationFilter(e.target.value)}
          >
            <option value="">Select Aggregation</option>
            <option value="hourly">Hourly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventAggregationFilter;
