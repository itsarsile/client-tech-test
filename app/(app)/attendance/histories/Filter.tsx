import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface FilterProps {
  onFilter: (date: string, department: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');

  const handleFilterChange = () => {
    onFilter(date, department);
  };

  return (
    <div className='grid grid-cols-3 gap-5 mb-5'>
      <Input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <Button onClick={handleFilterChange} className='max-w-24'>Filter</Button>
    </div>
  );
};

export default Filter;
