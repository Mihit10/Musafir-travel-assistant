"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const tajMahalData = {
    title: "Taj Mahal",
    location: "Agra, India",
    mainImage: "/api/placeholder/800/800", // Made taller for longer card
    thingsToDo: [
      { name: "Mehtab Bagh", distance: "1.2 km", time: "15 min walk" },
      { name: "Agra Fort", distance: "2.5 km", time: "10 min drive" },
      { name: "Fatehpur Sikri", distance: "40 km", time: "1 hour drive" }
    ],
    nearbyAttractions: [
      { name: "Agra Fort", image: "/api/placeholder/200/200" },
      { name: "Itimad-ud-Daulah", image: "/api/placeholder/200/200" },
      { name: "Mehtab Bagh", image: "/api/placeholder/200/200" },
      { name: "Fatehpur Sikri", image: "/api/placeholder/200/200" }
    ],
    proTip: "Visit during sunrise to avoid crowds and capture the marble changing colors in the morning light.",
    localFood: [
      {
        name: "Petha",
        image: "/api/placeholder/200/200", // Using placeholder instead of /images/petha.jpg
        description: "A translucent sweet made from ash gourd, native to Agra."
      },
      {
        name: "Gajak",
        image: "/api/placeholder/200/200", // Using placeholder instead of /images/gajak.jpg
        description: "Crispy sesame sweet, popular during winters."
      }
    ],
    history: "Built between 1632 and 1653 by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is considered the greatest architectural achievement in the whole range of Indo-Islamic architecture. The marble mausoleum stands on a raised platform with four identical facades, each with a massive arch in the center. Its central dome reaches a height of 240 feet.",
    placeInfo: {
      entryFee: "₹1,100 for foreigners, ₹50 for Indians",
      openHours: "Sunrise to sunset (closed on Fridays)",
      restrictions: "No tripods, food, or smoking",
      dressCode: "Modest clothing recommended"
    },
    realtimeData: {
      crowdStatus: "Moderate",
      visitorCount: "~450 visitors now",
      weather: "28°C, Sunny"
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
    //   style={{
    //     backgroundImage: "url('/taj-mahal.webp')",
    //   }}
    >
      <Head>
        <title>Taj Mahal Information</title>
        <meta name="description" content="Information about the Taj Mahal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Semi-transparent overlay to enhance text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <main className="relative z-10 min-h-screen w-full p-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">
          
          {/* Card 1: History */}
          <div className="bg-blue-100/90 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col justify-start items-start transform transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-auto rounded-br-2xl">
            <h2 className="text-xl font-bold mb-3 text-gray-800">History</h2>
            <p className="text-gray-600">{tajMahalData.history}</p>
          </div>
          
          {/* Card 2: Things to Do */}
          <div className="bg-green-100/90 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col justify-start items-start transform transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Things to Do</h2>
            <ul className="w-full">
              {tajMahalData.thingsToDo.map((item, index) => (
                <li key={index} className="mb-4 p-3 bg-white/60 rounded-md shadow-sm">
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <span>{item.distance}</span>
                    <span>{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Card 3: Place Info */}
          <div className="bg-orange-100/90 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col justify-start items-start transform transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Visitor Information</h2>
            <div className="w-full space-y-3">
              <div className="p-3 bg-white/60 rounded-md">
                <span className="font-semibold block">Entry Fee: </span>
                <span>{tajMahalData.placeInfo.entryFee}</span>
              </div>
              <div className="p-3 bg-white/60 rounded-md">
                <span className="font-semibold block">Open Hours: </span>
                <span>{tajMahalData.placeInfo.openHours}</span>
              </div>
              <div className="p-3 bg-white/60 rounded-md">
                <span className="font-semibold block">Restrictions: </span>
                <span>{tajMahalData.placeInfo.restrictions}</span>
              </div>
              <div className="p-3 bg-white/60 rounded-md">
                <span className="font-semibold block">Dress Code: </span>
                <span>{tajMahalData.placeInfo.dressCode}</span>
              </div>
            </div>
          </div>
          
          {/* Card 4: Local Food */}
          <div className="bg-purple-100/90 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col justify-start items-start transform transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Local Cuisine</h2>
            <div className="w-full grid grid-cols-1 gap-4">
              {tajMahalData.localFood.map((food, index) => (
                <div key={index} className="flex bg-white/60 rounded-md p-3 shadow-sm">
                  <div className="w-16 h-16 mr-4">
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{food.name}</h3>
                    <p className="text-sm text-gray-600">{food.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}