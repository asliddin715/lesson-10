import React, { useState, useEffect } from 'react';
import { Carousel } from "flowbite-react";

const Carusel = ({ countries }) => {
    const [shouldMove, setShouldMove] = useState(false);

    // Default placeholder items
    const defaultItems = [
        { name: { common: "Iran" }, flags: { png: "https://flagcdn.com/w320/ir.png" }, capital: "Tehran", population: "83 992 953" },
        { name: { common: "Albania 2" }, flags: { png: "https://flagcdn.com/w320/al.png" }, capital: "Tirana", population: "2 837 743" },
        { name: { common: "Brazilia 3" }, flags: { png: "https://flagcdn.com/w320/br.png" }, capital: "Brazili", population: "212 559 409" },
        { name: { common: "Belaruz" }, flags: { png: "https://flagcdn.com/w320/rs.png" }, capital: "Belgrade", population: "6 908 224" },
    ];

    // Combine default items with selected countries
    const displayItems = [...defaultItems, ...countries];

    // Group items in sets of four
    const groupedItems = [];
    for (let i = 0; i < displayItems.length; i += 4) {
        groupedItems.push(displayItems.slice(i, i + 4));
    }

    // Start moving the carousel only when new countries are added
    useEffect(() => {
        if (countries.length > 0) {
            setShouldMove(true);
        }
    }, [countries]);

    return (
        <div className="w-[960px] h-50 sm:h-64 xl:h-80 2xl:h-96 mb-10 m-auto b-black">
            <h2 className="text-center text-[40px] font-[600] mt-5">Davlatlar ro'yxati</h2>
            <Carousel slide={shouldMove}>
                {groupedItems.map((itemGroup, index) => (
                    <div key={index} className="h-56 sm:h-64 xl:h-80 2xl:h-96 flex items-center justify-around w-[800px]">
                        {itemGroup.map((item) => (
                            <div key={item.name.common} className="flex flex-col items-center">
                                <img className='object-contain w-[200px] h-[100px]' src={item.flags.png} alt={item.name.common} />
                                <div className="text-center">
                                    <h3 className="text-[24px] font-[500]">{item.name.common}</h3>
                                    <p>Capital: {item.capital || "N/A"}</p>
                                    <p>Population: {item.population.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Carusel;
