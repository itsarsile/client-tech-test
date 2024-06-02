-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `attendance_histories` (
	`employee_id` varchar(50),
	`attendance_id` varchar(100),
	`date_attendance` timestamp,
	`attendance_type` tinyint,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `attendances` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` datetime(3),
	`updated_at` datetime(3),
	`deleted_at` datetime(3),
	`employee_id` varchar(50),
	`attendance_id` varchar(100),
	`clock_in` timestamp,
	`clock_out` timestamp,
	CONSTRAINT `attendances_id` PRIMARY KEY(`id`),
	CONSTRAINT `uni_attendances_attendance_id` UNIQUE(`attendance_id`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` datetime(3),
	`updated_at` datetime(3),
	`deleted_at` datetime(3),
	`department_name` varchar(255),
	`max_clock_in_time` time(3),
	`max_clock_out_time` time(3),
	CONSTRAINT `departments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` datetime(3),
	`updated_at` datetime(3),
	`deleted_at` datetime(3),
	`employee_id` varchar(50),
	`name` varchar(255),
	`address` text,
	`department_id` bigint unsigned,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `uni_employees_employee_id` UNIQUE(`employee_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(64),
	`password` varchar(64),
	`role` enum('admin','sales','agents','guest'),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_attendances_deleted_at` ON `attendances` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `idx_departments_deleted_at` ON `departments` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `idx_employees_deleted_at` ON `employees` (`deleted_at`);--> statement-breakpoint
ALTER TABLE `attendance_histories` ADD CONSTRAINT `fk_attendances_attendance_histories` FOREIGN KEY (`attendance_id`) REFERENCES `attendances`(`attendance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendance_histories` ADD CONSTRAINT `fk_employees_attendance_histories` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendances` ADD CONSTRAINT `fk_employees_attendances` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `fk_departments_employees` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;
*/