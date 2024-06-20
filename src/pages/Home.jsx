import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo'
import '../css/page/home.css'
import { userData } from "../dummyData";
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/Ok/admin'); //TODO: Change this to propper role relationship
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;//modify this component so it looks better
  }

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default Home;