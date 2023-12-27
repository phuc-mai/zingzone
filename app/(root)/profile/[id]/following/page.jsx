"use client"

import ProfileCard from "@components/cards/ProfileCard";
import UserCard from "@components/cards/UserCard";
import Loader from "@components/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Following = () => {
  const { id } = useParams();
  console.log(id);

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});
  console.log(userData);

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
      <ProfileCard userData={userData} activeTab="Following" />

      <div className="flex flex-col gap-4 my-6">
        {userData?.following?.map((item) => (
          <UserCard key={item._id} userData={item} />
        ))}
      </div>
    </div>
  );
};

export default Following;
