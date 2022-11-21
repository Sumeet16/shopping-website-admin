import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import "./HomePage.css"

const HomePage = () => {
    const [orders, setorders] = useState([]);

    const getOrder = async () => {
        try {
            const res = await fetch("http://localhost:8080/getOrder");
            const orders = await res.json();
            setorders(orders.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrder();
    }, [])

    const handleClick = async (element, item) => {
        const res = await fetch("http://localhost:8080/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                element, item
            })
        })

        const result = await res.json();
        console.log(result);
        setorders(result.orders)
    }

    return (
        <>
            <Navbar />
            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignContent: "center", marginTop: "3rem" }}>
                <div className="recent_purchase">
                    {orders.length > 0 ? <>
                        <table>
                            <tr>
                                <th>Product Name</th>
                                <th>Customer Name</th>
                                <th>Product Price</th>
                                <th>Customer Email</th>
                                <th>Transaction Time</th>
                                <th>Approve/Decline</th>
                            </tr>
                            {orders.map((elem, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{elem.productName}</td>
                                            <td>{elem.userName}</td>
                                            <td>{elem.price} RS</td>
                                            <td>{elem.email}</td>
                                            <td>{elem.time}</td>
                                            <td style={{ display: "flex", justifyContent: "space-around" }}><p onClick={() => { handleClick("Approve", elem) }} style={{ cursor: "pointer" }}>✅</p><p onClick={() => { handleClick("Decline", elem) }} style={{ cursor: "pointer" }}>❌</p></td>
                                        </tr>
                                    </>
                                )
                            })}
                        </table>
                    </> : <><h3>No Order At Time</h3></>}
                </div>
            </div>
        </>
    )
}

export default HomePage