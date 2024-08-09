import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Drawer } from "flowbite-react";
import { Link } from "react-router-dom";
import Carusel from "./Carousel";

const Country = ({ countryCode }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [countryCode]);

    useEffect(() => {
        const savedCountries = JSON.parse(localStorage.getItem("selectedCountries")) || [];
        setSelectedRows(savedCountries);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCountries", JSON.stringify(selectedRows));
    }, [selectedRows]);

    const onPageChange = (page) => setCurrentPage(page);

    const handleRowClick = (country) => {
        const countryName = country.name.common;
        setSelectedRows((prev) =>
            prev.find((row) => row.name.common === countryName)
                ? prev.filter((row) => row.name.common !== countryName)
                : [...prev, country]
        );
    };

    const handleDrawerOpen = () => setIsOpen(true);
    const handleDrawerClose = () => setIsOpen(false);

    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <Carusel countries={selectedRows} />
            <h1 className="text-center text-[40px] font-[600] mb-8">Davlatlar</h1>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Country Name</Table.HeadCell>
                    <Table.HeadCell>Flags</Table.HeadCell>
                    <Table.HeadCell>Population</Table.HeadCell>
                    <Table.HeadCell>Capital</Table.HeadCell>
                    <Table.HeadCell>Select</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentItems.map((country) => {
                        const countryName = country.name.common;
                        const isSelected = selectedRows.some(row => row.name.common === countryName);
                        return (
                            <Table.Row
                                key={countryName}
                                className={`${isSelected ? "bg-green-200" : "bg-white"} dark:border-gray-700 dark:bg-gray-800 cursor-pointer`}
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <Link to={`/country/${country.cca2}`}>
                                        {countryName}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <img className="w-9" src={country.flags.png} alt={countryName} />
                                </Table.Cell>
                                <Table.Cell>{country.population.toLocaleString()}</Table.Cell>
                                <Table.Cell>{country.capital || "N/A"}</Table.Cell>
                                <Table.Cell>
                                    <button onClick={() => handleRowClick(country)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isSelected ? "#6ee7b7" : "black"}>
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.67 0-5-1.34-5-3s2.33-3 5-3 5 1.34 5 3-2.33 3-5 3z" />
                                        </svg>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <div className="m-auto flex justify-center mb-10 mt-5">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / itemsPerPage)} onPageChange={onPageChange} />
            </div>
            <div className="flex min-h-[50vh] items-center justify-center">
                <Button onClick={handleDrawerOpen}>Show drawer</Button>
            </div>
            <Drawer open={isOpen} onClose={handleDrawerClose}>
                <Drawer.Header title="Selected Countries" />
                <Drawer.Items>
                    <div className="flex flex-wrap justify-between ">
                        <div className="mb-5">
                            <img className="w-[130px] " src="https://flagcdn.com/w320/ir.png" alt="" />
                            <h4>Iran</h4>
                        </div>
                        <div className="mb-5">
                            <img className="w-[130px]" src="https://flagcdn.com/w320/al.png" alt="" />
                            <h4>Albania</h4>
                        </div>
                        <div className="mb-5">
                            <img className="w-[130px]" src="https://flagcdn.com/w320/br.png" alt="" />
                            <h4>Brailia</h4>
                        </div>
                        <div className="mb-5">
                            <img className="w-[130px]" src="https://flagcdn.com/w320/rs.png" alt="" />
                            <h4>Belarus</h4>
                        </div>
                    {selectedRows.map((country) => (
                        <div key={country.name.common} className="mb-4">
                            <img className="w-[130px]" src={country.flags.png} alt={country.name.common} />
                            <h4 className="text-gray-900 dark:text-white">{country.name.common}</h4>
                           
                        </div>
                    ))}
                    </div>
                </Drawer.Items>
            </Drawer>
        </div>
    );
};

export default Country;
