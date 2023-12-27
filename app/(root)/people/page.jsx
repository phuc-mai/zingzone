"use client";

import UserCard from "@components/cards/UserCard";
import Loader from "@components/loader";
import { useEffect, useState } from "react";

const People = () => {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return loading ? <Loader /> : (
    <div className="flex flex-col gap-4 my-6">
      {users.map((user) => (
        <UserCard key={user._id} userData={user} />
      ))}
    </div>
  );
};

export default People;
