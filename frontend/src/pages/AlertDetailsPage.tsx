import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Alert } from "../types/alerts.types";

import UpdateForm from "../components/UpdateForm";

const AlertDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { executingRequest, isLoading, error } = useFetch();
  const [alert, setAlert] = useState<Alert>();
  const [isUpdateForm, setISupdateForm] = useState(false);
  useEffect(() => {
    executingRequest("get", `/api/alerts/${id}`).then((data) => setAlert(data));
  }, [id, isUpdateForm]);
  const handleUpdate = () => {
    setISupdateForm(true);
  };
  const handleDelete = async (id) => {
    const data = await executingRequest("delete", `/api/alerts/${id}`);
    if (data === true) {
      navigate("/");
    }
  };
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>{alert?.displayName}</h2>
      <h3>תיאור המקרה</h3>
      <p>{alert?.description}</p>
      <h3>פיקוד</h3>
      <p>{alert?.arena}</p>
      {!isUpdateForm && (
        <>
          <button onClick={handleUpdate}>עדכון אירוע</button>
          <button onClick={() => handleDelete(alert?._id)}>מחיקת אירוע</button>
        </>
      )}
      {isUpdateForm && (
        <UpdateForm alert={alert} setISupdateForm={setISupdateForm} />
      )}
    </>
  );
};

export default AlertDetailsPage;
