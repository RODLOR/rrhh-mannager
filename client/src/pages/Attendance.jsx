import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Attendance() {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');
    const [attendances, setAttendances] = useState([]); // State to store attendance data

    const handleInputChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/check-in', { employeeId });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setEmployeeId(''); // Clear input after submission
        }
    };

    const handleShowTodayAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:4000/today-attendance');
            if (response.data.attendances != undefined) {
            setAttendances(response.data.attendances); // Update attendance state
            setMessage(''); // Clear previous message
        }
        else{
            console.log("There is not record so far.")
            alert("There is not record so far.")
        }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.'); // Use error message from response if available
        }
    };

    return (
        <div className="text-white container mx-auto mt-10">
            <h1 className="text-2xl mb-4">Attendance record</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={handleInputChange}
                    className="w-64 rounded-md border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="w-64 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                    Register
                </button>
                {message && <p className="text-green-500">{message}</p>}
            </form>

            <button onClick={handleShowTodayAttendance} className="mt-8 w-64 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">
                Show Today's Attendance
            </button>

            {attendances.length > 0 && (
                <section className="mt-4">
                    <h2 className="text-2xl mb-4">Today's Attendance</h2>
                    <table className="min-w-full">
                        <thead className="text-gray-500 dark:text-gray-200 even:border-gray-200 bg-gray-200 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances.map((attendance) => (
                                <tr key={attendance.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <span className="text-sm leading-5 text-gray-900 dark:text-white">{attendance.first_name} {attendance.last_name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <span className="text-sm leading-5 text-gray-900 dark:text-white">{attendance.attendance_at}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    );
}
