import api from "@/service/https";
import { useEffect } from "react";

const Home = () => {
  const fetchData = async () => {
    const { data } = await api.get("/users/profile");
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Home</div>;
};

export default Home;
