const BASE_URL = 'https://ems-backend-final.azurewebsites.net';

const API_ENDPOINTS = {
    SIGNUP_API: `${BASE_URL}/auth/register`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    APP_USER_DETAILS_API: `${BASE_URL}/user/user-details`,
    APP_FORGOT_PASSWORD_API: `${BASE_URL}/auth/forget-password`,
    APP_RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,

    EMPLOYEE_LOGIN_API: `${BASE_URL}/auth/login/employee`,

    // employees
    GET_EMPLOYEES_API: `${BASE_URL}/app/employees`,
    GET_EMPLOYEE_BY_ID: (id: string) => `${BASE_URL}/app/employees/${id}`,
    UPDATE_EMPLOYEE_DETAILS_API: (id: string) => `${BASE_URL}/app/employees/${id}`,

    // notifications
    SAVE_NOTIFICATION_API: `${BASE_URL}/notification`,
    GET_EMPLOYEE_NOTIFICATION_API: (id: string) => `${BASE_URL}/notification/${id}`,
    MARK_READ_NOTIFICATIONS_API: (id: string) => `${BASE_URL}/notification/${id}/emp-read`,

    GET_ADMIN_ID_API: `${BASE_URL}/app/employees/admin/ids`,

    // admin employee
    GET_ADMIN_EMPLOYEES_API: `${BASE_URL}/admin/employees`,
    GET_ALL_EMP_IDS_API: `${BASE_URL}/admin/employees/empIds`,
    CREATE_ADMIN_EMPLOYEE_API: (id: string) => `${BASE_URL}/admin/employees/${id}`,
    GET_ADMIN_EMPLOYEE_BY_ID: (id: string) => `${BASE_URL}/admin/employees/${id}`,
    UPDATE_ADMIN_EMPLOYEE_BY_ID: (id: string, departmentId: string) => `${BASE_URL}/admin/employees/${id}/${departmentId}`,
    DELETE_ADMIN_EMPLOYEE_BY_ID: (id: string) => `${BASE_URL}/admin/employees/${id}`,

    // departments
    GET_ADMIN_ALL_DEPARTMENTS_API: `${BASE_URL}/admin/departments`,
    CREATE_ADMIN_ALL_DEPARTMENTS_API: `${BASE_URL}/admin/departments`,
    GET_ADMIN_DEPARTMENT_BY_ID_API: (id: string) => `${BASE_URL}/admin/departments/${id}`,
    UPDATE_ADMIN_DEPARTMENT_BY_ID_API: (id: string) => `${BASE_URL}/admin/departments/${id}`,
    DELETE_ADMIN_DEPARTMENT_BY_ID_API: (id: string) => `${BASE_URL}/admin/departments/${id}`,

    // attendance
    MARK_ATTENDANCE_API: (id: string) => `${BASE_URL}/attendance/mark/${id}`,
    GET_ATTENDANCE_BY_EMP_ID_API: (employeeId: string) => `${BASE_URL}/attendance/employee/${employeeId}`,
    GET_ATTENDANCE_BY_DATE_API: (date: string) => `${BASE_URL}/attendance/date/${date}`,
    GET_ATTENDANCE_API: `${BASE_URL}/attendance/all`,
    GET_EMPLOYEE_ATTENDANCE_STATUS_API: (empId: string, date: string) => `${BASE_URL}/attendance/status/${empId}/${date}`,

    // leave
    REQUEST_LEAVE_API: (id: string) => `${BASE_URL}/leave/request/${id}`,
    APPROVE_LEAVE_API: (id: string) => `${BASE_URL}/leave/approve/${id}`,
    GET_LEAVES_BY_EMP_ID_API: (id: string) => `${BASE_URL}/leave/all/${id}`,
    GET_PENDING_LEAVE_API: `${BASE_URL}/leave/pending/all`,

    // Performance
    SAVE_PERFORMANCE_API: `${BASE_URL}/performance/save`,
    GET_PERFOMANCE_BY_EMPLOYEE_API: (empId: string) => `${BASE_URL}/performance/employee/${empId}`,
    GET_PERFOMANCE_BY_PERIOD: (period: string) => `${BASE_URL}/period/${period}`,

    // admin-holidays
    GET_ADMIN_HOLIDAYS_API: `${BASE_URL}/admin/holidays`,
    GET_ADMIN_HOLIDAY_BY_ID_API: (holidayId: string) => `${BASE_URL}/admin/holidays/${holidayId}`,
    CREATE_ADMIN_HOLIDAY_API: `${BASE_URL}/admin/holidays`,
    UPDATE_ADMIN_HOLIDAY_BY_ID_API: (holidayId: string) => `${BASE_URL}/admin/holidays/${holidayId}`,
    DELETE_ADMIN_HOLIDAY_BY_ID_API: (holidayId: string) => `${BASE_URL}/admin/holidays/${holidayId}`,

    // Employee Holidays
    GET_EMPLOYEE_HOLIDAYS_API: `${BASE_URL}/app/holidays/employee`,
}

export default API_ENDPOINTS;
