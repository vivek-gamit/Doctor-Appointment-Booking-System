import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);

    const getDoctorsData = async () => {
        try {
            const response = await fetch('http://localhost/doctor-backend/get_doctors.php');
            const data = await response.json();
            
            // Note: If your PHP returns {status: 'success', doctors: [...]}, use data.doctors
            // Otherwise, if it returns just the array, use 'data' directly.
            if (data.status === 'success') {
                setDoctors(data.doctors);
            } else {
                setDoctors(data); 
            }
        } catch (error) {
            console.error("Error fetching doctor data:", error);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    const value = {
        doctors,
        getDoctorsData // --- ADD THIS: Now other pages can refresh the list ---
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;