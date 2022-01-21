import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "../layout/ReservationsTable";
import TablesTable from "../layout/TablesTable";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);


  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }
  function loadTables(){
    const AC = new AbortController();
    listTables(AC.signal)
      .then(setTables)
      .catch(setError);
    return () => AC.abort();
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={error} />
      <div>

        <div className="d-md-flex mb-3" style={{flexDirection:"column", flex:"1"}}>
            <h4 className="mb-0">Reservations for {date}</h4>
            <ReservationsTable reservations={reservations}/>
        </div>

        <div className="d-md-flex mb-3" style={{flexDirection:"column"}}>
            <h4 className="mb-0">Tables</h4>
            <TablesTable tables={tables}/>
        </div>

      </div>

    </main>
  );
}

export default Dashboard;
