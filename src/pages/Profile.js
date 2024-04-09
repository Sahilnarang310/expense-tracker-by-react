import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nameRef = useRef();
  const picUrlRef = useRef();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const expensePageHandler = () => {
    navigate("expense");
  };
  useEffect(() => {
    async function fetchData() {
      if (!token) {
        navigate("/");
      } else {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`,
          {
            idToken: token,
          }
        );
        nameRef.current.value = response.data.users[0].displayName;
        picUrlRef.current.value = response.data.users[0].photoUrl;
      }
    }
    fetchData();
    return;
  }, [navigate, token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API}`,
      {
        idToken: localStorage.getItem("token"),
        displayName: nameRef.current.value,
        photoUrl: picUrlRef.current.value,
        returnSecureToken: true,
      }
    );
    console.log(response);
    nameRef.current.value = "";
    picUrlRef.current.value = "";
    navigate("expense");
  };
  return (
    <div className="mt-14 grid place-items-end">
      <form>
        <div className="flex justify-between m-2">
          <h2 className="text-2xl  font-bold">Contact details</h2>
          <button
            type="button"
            className="rounded border-2 px-1 border-red-300 text-red-600"
            onClick={expensePageHandler}
          >
            Cancel
          </button>
        </div>
        <label className="ms-10" htmlFor="username">
          Full name:{" "}
        </label>
        <input
          ref={nameRef}
          id="username"
          className="border-2 rounded mx-8"
          type="text"
        />
        <label htmlFor="picUrl">Profile Photo Pic: </label>
        <input
          ref={picUrlRef}
          id="picUrl"
          className="border-2 rounded mx-8"
          type="text"
        />
        <div>
          <button
            type="submit"
            className="rounded p-1  m-2 bg-red-400 text-white"
            onClick={(e) => submitHandler(e)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
