import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Alert } from "../types/alerts.types";

import UpdateForm from "../components/UpdateForm";
import { useAlertsStore } from "../store/useAlertsStore";

const AlertDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { executingRequest, isLoading, error } = useFetch();
  const [alert, setAlert] = useState<Alert>();
  const [msg, setMsg] = useState<string>();
  const { deleteAlert } = useAlertsStore();
  const [isUpdateForm, setISupdateForm] = useState(false);
  useEffect(() => {
    executingRequest("get", `/api/alerts/${id}`).then((data) => setAlert(data));
  }, [id, isUpdateForm]);
  const handleUpdate = () => {
    setISupdateForm(true);
  };
  const handleDelete = async (id: any) => {
    const data = await executingRequest("delete", `/api/alerts/${id}`);
    if (data === true) {
      deleteAlert(id);
      navigate("/");
    }
  };
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <article className="alert-details">
        <h2>{alert?.displayName}</h2>
        <h3>תיאור המקרה</h3>
        <p>{alert?.description}</p>
        <h3>פיקוד</h3>
        <p>{alert?.arena}</p>
        <h3>סטטוס</h3>
        <p>{alert?.status}</p>
      </article>
      {!isUpdateForm && (
        <div className="details-btns">
          <button onClick={handleUpdate}>עדכון אירוע</button>
          <button onClick={() => handleDelete(alert?._id)}>מחיקת אירוע</button>
        </div>
      )}
      {isUpdateForm && (
        <UpdateForm
          alert={alert}
          setISupdateForm={setISupdateForm}
          setMsg={setMsg}
        />
      )}
      {msg && (
        <>
          <p>{msg}</p> <button onClick={() => navigate("/")}>לעמוד הבית</button>
        </>
      )}
    </>
  );
};

export default AlertDetailsPage;
