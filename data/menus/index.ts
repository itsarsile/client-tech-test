export const menus = [
  { name: 'Home', path: '/' },
  { name: 'Employees', path: '/employees' },
  { name: 'Departments', path: '/departments' },
  {
    name: 'Attendance', subMenu: [
      { name: 'Log', path: '/attendance/employee-log' },
      { name: 'Histories', path: '/attendance/histories' },
    ]
  }
]
