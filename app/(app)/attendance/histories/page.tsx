"use client"
import React, { useEffect, useState } from 'react';
import getAttendanceHistories from './actions/getAttendanceHistories';
import { columns } from './columns';
import { DataTable } from './data-table';
import Filter from './Filter';


const Histories: React.FC = () => {
  const [filterDate, setFilterDate] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const queryParams = {
        date: filterDate,
        department: filterDepartment,
      };
      const fetchedData = await getAttendanceHistories(queryParams);
      setData(fetchedData);
      setIsLoading(false);
    };
    fetchData();
  }, [filterDate, filterDepartment]);

  const handleFilter = (date: string, department: string) => {
    setFilterDate(date);
    setFilterDepartment(department);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="p-5 font-black text-2xl">Attendance Histories</h1>
      <Filter onFilter={handleFilter} />
      {data ?
        <DataTable columns={columns} data={data} /> : <DataTable columns={columns} data={[]} />
      }
    </div>
  );
};

export default Histories;
