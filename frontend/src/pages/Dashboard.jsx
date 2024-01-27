import React, { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const value = 'Bearer';

        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: `${value} ${token}`
          }
        });

        const balanceValue = response.data.balance;
        setBalance(balanceValue);
      } catch (error) {
        console.error('Error fetching balance:', error);
       
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <Appbar />
      <div className="m-8">
        {balance !== null ? (
          <Balance value={balance} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Users/>
    </div>
  );
};

export default Dashboard;
