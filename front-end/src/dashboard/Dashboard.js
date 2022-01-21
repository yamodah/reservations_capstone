import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  function loadTables(){
    const AC = new AbortController();
    listTables(AC.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => AC.abort();
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div style={{display:"flex",flexDirection:"row"}}>
       <div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      {JSON.stringify(reservations)}
      <ErrorAlert error={reservationsError} />
      </div> 
      <div>
      
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      {JSON.stringify(tables)}
      </div>
      </div>
    </main>
  );
}

export default Dashboard;
