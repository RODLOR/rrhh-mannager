import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payroll() {
    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState({
        employeeId: '',
        amount: '',
        date: ''
    });

    useEffect(() => {
        // Obtener los pagos quincenales
        axios.get('http://localhost:4000/payroll')
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los pagos:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment({
            ...newPayment,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/payroll', newPayment)
            .then(response => {
                setPayments([...payments, { ...newPayment, id: response.data.id }]);
                setNewPayment({
                    employeeId: '',
                    amount: '',
                    date: ''
                });
            })
            .catch(error => {
                console.error('Error al agregar el pago:', error);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payroll</h1>
            
            {/* Formulario para agregar un nuevo pago */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Employee ID</label>
                    <input 
                        type="number"
                        name="employeeId"
                        value={newPayment.employeeId}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        value={newPayment.amount}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Date</label>
                    <input 
                        type="date"
                        name="date"
                        value={newPayment.date}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Payment</button>
            </form>

            {/* Lista de pagos */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Payments List</h2>
                <ul>
                    {payments.map(payment => (
                        <li key={payment.id} className="mb-2">
                            Employee ID: {payment.employeeId}, Amount: {payment.amount}, Date: {payment.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Payroll;
