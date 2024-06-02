import { mysqlTable, time, mysqlSchema, AnyMySqlColumn, foreignKey, varchar, timestamp, tinyint, text, index, primaryKey, unique, datetime, mysqlEnum, bigint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const attendanceHistories = mysqlTable("attendance_histories", {
	employeeId: varchar("employee_id", { length: 50 }).references(() => employees.employeeId),
	attendanceId: varchar("attendance_id", { length: 100 }).references(() => attendances.attendanceId),
	dateAttendance: timestamp("date_attendance", { mode: 'string' }),
	attendanceType: tinyint("attendance_type"),
	description: text("description"),
});

export const attendances = mysqlTable("attendances", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	createdAt: datetime("created_at", { mode: 'string', fsp: 3 }),
	updatedAt: datetime("updated_at", { mode: 'string', fsp: 3 }),
	deletedAt: datetime("deleted_at", { mode: 'string', fsp: 3 }),
	employeeId: varchar("employee_id", { length: 50 }).references(() => employees.employeeId),
	attendanceId: varchar("attendance_id", { length: 100 }),
	clockIn: timestamp("clock_in", { mode: 'string' }),
	clockOut: timestamp("clock_out", { mode: 'string' }),
},
	(table) => {
		return {
			idxAttendancesDeletedAt: index("idx_attendances_deleted_at").on(table.deletedAt),
			attendancesId: primaryKey({ columns: [table.id], name: "attendances_id" }),
			uniAttendancesAttendanceId: unique("uni_attendances_attendance_id").on(table.attendanceId),
		}
	});

export const departments = mysqlTable("departments", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	createdAt: datetime("created_at", { mode: 'string', fsp: 3 }),
	updatedAt: datetime("updated_at", { mode: 'string', fsp: 3 }),
	deletedAt: datetime("deleted_at", { mode: 'string', fsp: 3 }),
	departmentName: varchar("department_name", { length: 255 }),
	maxClockInTime: time("max_clock_in_time", { fsp: 3 }),
	maxClockOutTime: time("max_clock_out_time", { fsp: 3 }),
},
	(table) => {
		return {
			idxDepartmentsDeletedAt: index("idx_departments_deleted_at").on(table.deletedAt),
			departmentsId: primaryKey({ columns: [table.id], name: "departments_id" }),
		}
	});

export const employees = mysqlTable("employees", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	createdAt: datetime("created_at", { mode: 'string', fsp: 3 }),
	updatedAt: datetime("updated_at", { mode: 'string', fsp: 3 }),
	deletedAt: datetime("deleted_at", { mode: 'string', fsp: 3 }),
	employeeId: varchar("employee_id", { length: 50 }),
	name: varchar("name", { length: 255 }),
	address: text("address"),
	departmentId: bigint("department_id", { mode: "number", unsigned: true }).references(() => departments.id),
},
	(table) => {
		return {
			idxEmployeesDeletedAt: index("idx_employees_deleted_at").on(table.deletedAt),
			employeesId: primaryKey({ columns: [table.id], name: "employees_id" }),
			uniEmployeesEmployeeId: unique("uni_employees_employee_id").on(table.employeeId),
		}
	});

export const users = mysqlTable("users", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	email: varchar("email", { length: 64 }),
	password: varchar("password", { length: 64 }),
	role: mysqlEnum("role", ['admin', 'sales', 'agents', 'guest']),
},
	(table) => {
		return {
			usersId: primaryKey({ columns: [table.id], name: "users_id" }),
		}
	});
