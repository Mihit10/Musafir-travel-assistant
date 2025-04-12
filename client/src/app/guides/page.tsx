"use client"; // This marks the component as a client component in Next.js

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

interface Guide {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  adhar_card: string;
  years_of_experience: number;
  age: number;
  ratings: string;
  language: string;
  city: string;
  places: string[];
}

export default function LocalGuidesPage() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [allGuides, setAllGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  
  // Hardcoded guide data for Indian states
  const guidesData: Guide[] = [
    {
      "id": 1,
      "name": "Raj Sharma",
      "email": "raj.sharma@example.com",
      "phone_number": "9876543210",
      "adhar_card": "1234-5678-9101",
      "years_of_experience": 7,
      "age": 32,
      "ratings": "4.8",
      "language": "Hindi, English",
      "city": "Goa",
      "places": ["Calangute Beach", "Fort Aguada", "Dudhsagar Falls"]
    },
    {
      "id": 2,
      "name": "Priya Nair",
      "email": "priya.nair@example.com",
      "phone_number": "8765432109",
      "adhar_card": "2345-6789-0123",
      "years_of_experience": 5,
      "age": 29,
      "ratings": "4.6",
      "language": "Malayalam, English, Hindi",
      "city": "Kerala",
      "places": ["Munnar", "Alleppey Backwaters", "Kovalam Beach"]
    },
    {
      "id": 3,
      "name": "Vikram Singh",
      "email": "vikram.singh@example.com",
      "phone_number": "7654321098",
      "adhar_card": "3456-7890-1234",
      "years_of_experience": 9,
      "age": 35,
      "ratings": "4.9",
      "language": "Hindi, English, Pahari",
      "city": "Himachal",
      "places": ["Shimla", "Manali", "Dharamshala"]
    },
    {
      "id": 4,
      "name": "Ananya Joshi",
      "email": "ananya.joshi@example.com",
      "phone_number": "6543210987",
      "adhar_card": "4567-8901-2345",
      "years_of_experience": 4,
      "age": 27,
      "ratings": "4.5",
      "language": "Hindi, English, Garhwali",
      "city": "Uttarakhand",
      "places": ["Rishikesh", "Nainital", "Valley of Flowers"]
    },
    {
      "id": 5,
      "name": "Arjun Mehra",
      "email": "arjun.mehra@example.com",
      "phone_number": "5432109876",
      "adhar_card": "5678-9012-3456",
      "years_of_experience": 8,
      "age": 33,
      "ratings": "4.7",
      "language": "Hindi, English, Rajasthani",
      "city": "Rajasthan",
      "places": ["Jaipur", "Udaipur", "Jaisalmer"]
    },
    {
      "id": 6,
      "name": "Sunita Gomes",
      "email": "sunita.gomes@example.com",
      "phone_number": "9765432101",
      "adhar_card": "6789-0123-4567",
      "years_of_experience": 6,
      "age": 31,
      "ratings": "4.7",
      "language": "English, Konkani, Marathi",
      "city": "Goa",
      "places": ["Baga Beach", "Basilica of Bom Jesus", "Spice Plantations"]
    },
    {
      "id": 7,
      "name": "Ramesh Varma",
      "email": "ramesh.varma@example.com",
      "phone_number": "8654321092",
      "adhar_card": "7890-1234-5678",
      "years_of_experience": 10,
      "age": 40,
      "ratings": "4.9",
      "language": "Malayalam, Tamil, English",
      "city": "Kerala",
      "places": ["Thekkady", "Varkala Beach", "Fort Kochi"]
    },
    {
      "id": 8,
      "name": "Pooja Sharma",
      "email": "pooja.sharma@example.com",
      "phone_number": "7543210983",
      "adhar_card": "8901-2345-6789",
      "years_of_experience": 3,
      "age": 25,
      "ratings": "4.4",
      "language": "Hindi, English",
      "city": "Himachal",
      "places": ["Kullu", "Spiti Valley", "Dalhousie"]
    },
    {
      "id": 9,
      "name": "Suresh Rawat",
      "email": "suresh.rawat@example.com",
      "phone_number": "6432109874",
      "adhar_card": "9012-3456-7890",
      "years_of_experience": 12,
      "age": 45,
      "ratings": "5.0",
      "language": "Hindi, English, Sanskrit",
      "city": "Uttarakhand",
      "places": ["Haridwar", "Auli", "Jim Corbett National Park"]
    },
    {
      "id": 10,
      "name": "Deepika Rathore",
      "email": "deepika.rathore@example.com",
      "phone_number": "5321098765",
      "adhar_card": "0123-4567-8901",
      "years_of_experience": 6,
      "age": 30,
      "ratings": "4.6",
      "language": "Hindi, English, Marwari",
      "city": "Rajasthan",
      "places": ["Pushkar", "Mount Abu", "Bikaner"]
    },
    {
      "id": 11,
      "name": "Joseph D'Souza",
      "email": "joseph.dsouza@example.com",
      "phone_number": "9654321090",
      "adhar_card": "1122-3344-5566",
      "years_of_experience": 4,
      "age": 28,
      "ratings": "4.5",
      "language": "English, Konkani",
      "city": "Goa",
      "places": ["Palolem Beach", "Se Cathedral", "Mollem National Park"]
    },
    {
      "id": 12,
      "name": "Lakshmi Menon",
      "email": "lakshmi.menon@example.com",
      "phone_number": "8543210981",
      "adhar_card": "2233-4455-6677",
      "years_of_experience": 7,
      "age": 34,
      "ratings": "4.8",
      "language": "Malayalam, English",
      "city": "Kerala",
      "places": ["Wayanad", "Bekal Fort", "Athirappilly Falls"]
    },
    {
      "id": 13,
      "name": "Karan Verma",
      "email": "karan.verma@example.com",
      "phone_number": "7432109872",
      "adhar_card": "3344-5566-7788",
      "years_of_experience": 5,
      "age": 29,
      "ratings": "4.7",
      "language": "Hindi, English, Kangri",
      "city": "Himachal",
      "places": ["Bir Billing", "Khajjiar", "Solang Valley"]
    },
    {
      "id": 14,
      "name": "Geeta Negi",
      "email": "geeta.negi@example.com",
      "phone_number": "6321098763",
      "adhar_card": "4455-6677-8899",
      "years_of_experience": 9,
      "age": 38,
      "ratings": "4.9",
      "language": "Hindi, English, Kumaoni",
      "city": "Uttarakhand",
      "places": ["Mussoorie", "Badrinath", "Hemkund Sahib"]
    },
    {
      "id": 15,
      "name": "Rajesh Choudhary",
      "email": "rajesh.choudhary@example.com",
      "phone_number": "5210987654",
      "adhar_card": "5566-7788-9900",
      "years_of_experience": 3,
      "age": 26,
      "ratings": "4.5",
      "language": "Hindi, English, Mewari",
      "city": "Rajasthan",
      "places": ["Jodhpur", "Ranthambore National Park", "Chittorgarh"]
    },
    {
      "id": 16,
      "name": "Maria Fernandes",
      "email": "maria.fernandes@example.com",
      "phone_number": "9543210979",
      "adhar_card": "6677-8899-0011",
      "years_of_experience": 8,
      "age": 36,
      "ratings": "4.8",
      "language": "English, Portuguese, Konkani",
      "city": "Goa",
      "places": ["Vasco da Gama", "Anjuna Beach", "Bondla Wildlife Sanctuary"]
    },
    {
      "id": 17,
      "name": "Sreejith Pillai",
      "email": "sreejith.pillai@example.com",
      "phone_number": "8432109760",
      "adhar_card": "7788-9900-1122",
      "years_of_experience": 6,
      "age": 31,
      "ratings": "4.7",
      "language": "Malayalam, English, Tamil",
      "city": "Kerala",
      "places": ["Poovar Island", "Periyar National Park", "Bekal Beach"]
    },
    {
      "id": 18,
      "name": "Amit Guleria",
      "email": "amit.guleria@example.com",
      "phone_number": "7321097651",
      "adhar_card": "8899-0011-2233",
      "years_of_experience": 11,
      "age": 42,
      "ratings": "5.0",
      "language": "Hindi, English, Mandi",
      "city": "Himachal",
      "places": ["Rewalsar Lake", "Great Himalayan National Park", "Kasauli"]
    },
    {
      "id": 19,
      "name": "Shalini Pant",
      "email": "shalini.pant@example.com",
      "phone_number": "6210976542",
      "adhar_card": "9900-1122-3344",
      "years_of_experience": 4,
      "age": 27,
      "ratings": "4.6",
      "language": "Hindi, English",
      "city": "Uttarakhand",
      "places": ["Binsar", "Gangotri", "Chopta"]
    },
    {
      "id": 20,
      "name": "Govind Singh",
      "email": "govind.singh@example.com",
      "phone_number": "5109765433",
      "adhar_card": "0011-2233-4455",
      "years_of_experience": 7,
      "age": 33,
      "ratings": "4.7",
      "language": "Hindi, English, Dhundhari",
      "city": "Rajasthan",
      "places": ["Shekhawati", "Bharatpur Bird Sanctuary", "Kumbhalgarh"]
    }
  ];
  
  // Cities as required
  const cities = ['Goa', 'Kerala', 'Himachal', 'Uttarakhand', 'Rajasthan'];

  const guideImages = [
    "https://www.thegoan.net/uploads/news/big_97251_230401-VAS01A.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5tRTipUU_ZSOAYniIyK2FTkhVnSBnk7bQw&s",
    "https://thumbs.dreamstime.com/b/punjabi-man-21454099.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVU0nqDGg5Nl2zOBSrTg4nCd3evGMkwIHaww&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QKCsewPJVnz-DZIsWcHGtKNdSugGBRAa3yT35U73tJgUanoy0bdvSbCmWmj4xLPLqrQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdV1lGWcL1i7o318NK4dJfip_JjXndUfuY4g&s",
    "https://www.shutterstock.com/image-photo/headshot-indian-man-location-kerala-260nw-2151905607.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAsLiIdgLfyjgyEtAX1uSSEGbPsbUE7J3-Yw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwsQgRLhgGilQ1oKPO42bzzUPqYzH0WpMLgg&s",
    "https://media.istockphoto.com/id/629760410/photo/young-indian-woman-holding-her-little-baby-india.jpg?s=612x612&w=0&k=20&c=D4Rv1jnXdvirndmhl9px4R8iX0_uwe5sB5GEdSMUlQ4=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS33B7h0nj0I1m0rZvf_3YR4lpI1lw3gxZAwQ&s",
    "https://i.pinimg.com/736x/6c/8e/79/6c8e7960624df008868d829040041625.jpg",
    "https://pbs.twimg.com/profile_images/1032667323503497217/O7eJC39y_400x400.jpg",
    "https://www.euttarakhand.com/wp-content/uploads/2016/10/Traditional-outfit-of-uttarakhand-woman.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWVJgwUwq0tN4JLw0xpEx5pYLgRx-3l1Qfw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjxUAaP02RuczihdRwNXccF5XXX-VAHxDIJw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSXDeSE-SH2N2szEPXjywmvwiGQy4q6oGyYA&s",
    "https://live.staticflickr.com/1516/26460945951_3e6f338f22_o.jpg",
    "https://live.staticflickr.com/2852/13739993544_b4fa3b38bd_b.jpg",
    "https://img.freepik.com/premium-photo/rajasthani-people-pushkar-fair-held-rajasthan-every-year-ajmer-rajasthan-india_617018-397.jpg"
  ];
  
  // Load data on component mount
  useEffect(() => {
    setLoading(true);
    // Use the hardcoded data instead of fetching
    setAllGuides(guidesData);
    setLoading(false);
  }, []);
  
  // Filter guides when city selection changes
  useEffect(() => {
    if (selectedCity && allGuides.length > 0) {
      const filteredGuides = allGuides.filter(guide => guide.city === selectedCity);
      setGuides(filteredGuides);
    } else {
      setGuides([]);
    }
  }, [selectedCity, allGuides]);
  
  const toggleExpand = (guideId: number) => {
    if (expandedGuide === guideId) {
      setExpandedGuide(null);
    } else {
      setExpandedGuide(guideId);
    }
  };
  
  const generateWhatsAppLink = (phoneNumber: string, city: string): string => {
    const message = `Hi, I am visiting ${city} and would like to enquire more.`;
    return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Local Travel Guides</h1>
      
      <div className="mb-8">
        <label htmlFor="city-select" className="block text-lg font-medium mb-2">
          Select a State
        </label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select a state --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.length > 0 ? (
            guides.map((guide) => (
              <div 
                key={guide.id} 
                className="border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 flex flex-col"
              >
                {/* Square Image Placeholder */}
                <div className="w-full h-70 relative bg-gray-200">
                  {guideImages && guideImages[guide.id - 1] ? (
                    <img
                      src={guideImages[guide.id - 1]}
                      alt={guide.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <MapPin className="h-12 w-12 mb-2" />
                        <span className="text-sm">Guide Photo</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className="bg-white p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(guide.id)}
                >
                  <div>
                    <h2 className="text-xl font-semibold">{guide.name}</h2>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">Guides in:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {guide.places.map((place, idx) => (
                          <span 
                            key={idx} 
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {expandedGuide === guide.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                
                {expandedGuide === guide.id && (
                  <div className="bg-gray-50 p-4 border-t border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 gap-2">
                      <p className="text-sm text-gray-600">Age: <span className="font-medium text-gray-900">{guide.age}</span></p>
                      {/* <p className="text-sm text-gray-600">Aadhaar: <span className="font-medium text-gray-900">{guide.adhar_card}</span></p> */}
                      <p className="text-sm text-gray-600">Experience: <span className="font-medium text-gray-900">{guide.years_of_experience} years</span></p>
                      <p className="text-sm text-gray-600">Rating: <span className="font-medium text-gray-900">{guide.ratings} ⭐</span></p>
                      <p className="text-sm text-gray-600">Languages: <span className="font-medium text-gray-900">{guide.language}</span></p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a 
                        href={`tel:${guide.phone_number}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                      <a 
                        href={`mailto:${guide.email}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                      <a 
                        href={generateWhatsAppLink(guide.phone_number, selectedCity)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : selectedCity ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No guides found for {selectedCity}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}