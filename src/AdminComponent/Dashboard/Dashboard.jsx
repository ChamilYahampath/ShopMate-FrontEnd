import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { getAllItems, getAllOrders } from '../../ApiService/Api';
import { format, subDays } from 'date-fns';

export const Dashboard = () => {

  return(
    <div>
      <iframe src="http://172.16.16.103:8088/superset/dashboard/p/B9VnpZdQOk6/" title="Dashboard" className='w-full h-screen'>
      </iframe>
    </div>
  );
};
