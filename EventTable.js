import React, { useState } from 'react';

const EventTable = ({ filteredEvents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Number of records to display per page

  // Calculate the indices for the events to show on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Slice the filteredEvents to show only the records for the current page
  const currentRecords = filteredEvents.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / recordsPerPage);

  // Handle the Next button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the Previous button click
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-75">
      {/* Left section: Table */}
      <div>
        <h3 className="header-info">Event List</h3>
        <table
          className="table table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Type</th>
              <th>File Name</th>
              <th>File Count</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((event, index) => (
                <tr key={index}>
                  <td>{event.id}</td>
                  <td>{event.event_type}</td>
                  <td>{event.file_name}</td>
                  <td>{event.file_count}</td>
                  <td>{event.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No events found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        {filteredEvents.length > recordsPerPage && (
          <div className="d-flex justify-content-start mt-3">
            <button 
              className="btn btn-primary me-2" // added margin-right to space the buttons
              onClick={handlePrev} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleNext} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default EventTable;
