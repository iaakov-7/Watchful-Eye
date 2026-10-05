import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Alert } from "../types/alerts.types";

const AlertDetailsPage = () => {
  const { id } = useParams();
  const { executingRequest, isLoading, error } = useFetch();
  const [alert, setAlert] = useState<Alert>();
  useEffect(() => {
    executingRequest("get", `/api/alerts/${id}`)
      .then((data) => setAlert(data))
      .then(() => console.log(data));
  }, [id]);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>{alert?.displayName}</h2>
    </>
  );
};

export default AlertDetailsPage;
