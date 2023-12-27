"use client"

import ProfileCard from "@components/cards/ProfileCard";
import UserCard from "@components/cards/UserCard";
import Loader from "@components/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Followers = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Followers" />

      <div className="flex flex-col gap-4 my-6">
        {userData.followers.map((item) => (
          <UserCard key={user._id} userData={item} />
        ))}
      </div>
    </div>
  );
};

export default Followers;
