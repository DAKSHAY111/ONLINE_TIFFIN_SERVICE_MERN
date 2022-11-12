import { React, createContext, useState, useEffect } from "react";

const UserContext = createContext();
const DispatchUserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = "Bearer " + localStorage.getItem("jwt");
            try {
                const res = await fetch("http://127.0.0.1:9000/OTS/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                        "Access-Control-Allow-Origin": "*",
                    },
                });

                const data = await res.json();


                if (data.status !== "success") {
                    setUser(null);
                } else {
                    setUser(data.data);
                    console.log("From UserContext" + data);
                }


            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={user}>
            <DispatchUserContext.Provider value={setUser}>
                {children}
            </DispatchUserContext.Provider>
        </UserContext.Provider>
    )
}

export { UserContext, DispatchUserContext, UserContextProvider };