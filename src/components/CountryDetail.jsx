import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import LineChart from "./LineChart";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const CountryDetail = () => {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate('/')
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${countryName}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCountry(result[0]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [countryName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-[1440px] p-5 m-auto">
            <h1 className="text-[40px] mb-10">Country</h1>
            <div className="flex items-end gap-4 mb-10">
                <div>
                    <h1 className="font-sans text-[30px] text-center mb-2">{country.name.common}</h1>
                    <img src={country.flags.png} alt={country.name.common} />
                </div>
                <div>
                    <p>Population: {country.population.toLocaleString()}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Region: {country.region}</p>
                    <p>Subregion: {country.subregion}</p>
                    <p>Languages: {Object.values(country.languages).join(", ")}</p>
                    <Button className="mt-5" onClick={()=> navigate('/')}>Back Home</Button>
                </div>
            </div>

            <div className="w-[700px]">
                <LineChart />

            </div>
        </div>
    );
};

export default CountryDetail;
