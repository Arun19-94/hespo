import { useEffect, useState } from "react";

function DashBoard() {
    const cities: String[] = [
        "CITY-1",
        "CITY-2",
        "CITY-3",
        "CITY-4",
        "CITY-5",
        "CITY-6",
        "CITY-7"
    ]
    return (
    <>
        <h1>LIST</h1>
        {cities.length === 0 && <p>NO ITEMS TO DISPLAY</p>}
        <ul className="list-group">
        {
            cities.map(city =>(
                <li key ={city.toString()}>{city}</li>
            ))
        }
        </ul>
    </>)

// return (<h1>"LOGIN PAGES1"</h1>)
}

export default DashBoard;