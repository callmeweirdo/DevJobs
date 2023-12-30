import {  useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const options = {
        headers: {
            'X-RapidAPI-Key': '852f6ad7b9msh4e42c5565ca4d3cp16b149jsnee5337799199',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query
            // query: 'Python developer in Texas, USA',
            // page: '1',
            // num_pages: '1'
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            console.log(data);
        } catch (error) {
            setError(error);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { isLoading, error, data, fetchData };

}

export default useFetch;