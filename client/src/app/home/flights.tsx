// components/FlightOptions.jsx
"use client";
import { useState } from 'react';

const FlightOptions = () => {
  const [flights] = useState([
    {
      id: 1,
      airline: "SkyWings",
      flightNo: "SW123",
      departure: "08:30 AM",
      arrival: "10:45 AM",
      price: "$249",
      direct: true
    },
    {
      id: 2,
      airline: "AirGlobal",
      flightNo: "AG456",
      departure: "11:15 AM",
      arrival: "01:30 PM",
      price: "$199",
      direct: true
    },
    {
      id: 3,
      airline: "TransOcean",
      flightNo: "TO789",
      departure: "02:45 PM",
      arrival: "06:20 PM",
      price: "$175",
      direct: false
    },
    {
      id: 4,
      airline: "MountainJet",
      flightNo: "MJ234",
      departure: "07:00 PM",
      arrival: "09:15 PM",
      price: "$225",
      direct: true
    }
  ]);

  return (
    <div id="flightOptions" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-secondary">Flight Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flights.map((flight) => (
            <div 
              key={flight.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="bg-tertiary text-white p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{flight.airline}</span>
                  <span className="text-sm">{flight.flightNo}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Departure</div>
                    <div className="font-semibold">{flight.departure}</div>
                  </div>
                  
                  <div className="flex items-center px-2">
                    <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                    <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
                    {flight.direct ? (
                      <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
                        <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                      </>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Arrival</div>
                    <div className="font-semibold">{flight.arrival}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="font-bold text-secondary text-lg">{flight.price}</div>
                  <div className="text-xs bg-primary text-secondary px-2 py-1 rounded">
                    {flight.direct ? 'Direct Flight' : '1 Stop'}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-secondary hover:bg-red-800 text-white py-2 rounded transition-colors duration-300">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightOptions;