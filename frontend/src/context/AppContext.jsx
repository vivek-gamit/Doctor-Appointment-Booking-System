import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    // 1. Initialize doctors as an empty array
    const [doctors, setDoctors] = useState([]);

    // 2. Function to fetch data from your PHP API
    const getDoctorsData = async () => {
        try {
            // This points to the PHP file you just tested in the browser
            const response = await fetch('http://localhost/doctor-backend/get_doctors.php');
            const data = await response.json();
            
            // 3. Update the state with the live data from MySQL
            setDoctors(data);
        } catch (error) {
            console.error("Error fetching doctor data:", error);
        }
    };

    // 4. Run the fetch function once when the app starts
    useEffect(() => {
        getDoctorsData();
    }, []);

    const value = {
        doctors // This 'doctors' now contains the live data from your database
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;