import { API } from "../config";

// As parameter we receive an object
export const signup = user => {
    // To send data to the backend fetch can be used
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            // When we make a post request the API will respond with the JSON data.
            // We need to maje sure that we accept the application/json
            Accept: "application/json",
            // Content type indicates what sort of content type we're sending with the push to request it
            "Content-Type": "application/json"
        },
        // stringify is used to convert the object in a JSON string 
        body: JSON.stringify(user)
    })
    // When the fetch is make we will either get a successful response or an error to handle

        // Sucessful response
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};
