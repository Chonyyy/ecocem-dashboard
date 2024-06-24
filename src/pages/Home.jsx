import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo'
import '../css/page/home.css'
import { userData } from "../dummyData";
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkAuth, checkAdmin } from '../scripts/auth';

function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [administrator, setAdministrator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthenticated = async () => {
      if (await checkAuth()) {
        setAuthenticated(true);
        if (await checkAdmin()) {
          setAdministrator(true);
        }
      }
      else {
        navigate('/login')
      }
    }
    checkAuthenticated()
  }, [navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;//TODO: modify this component so it looks better
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