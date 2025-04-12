"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";

export default function CommunityPage() {
  const [selectedState, setSelectedState] = useState("Goa");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [favorites, setFavorites] = useState<(string | number)[]>([]);
 

  const states = ["Goa", "Kerala", "Himachal", "Uttarakhand", "Rajasthan"];
  const tags = ["Attractions", "Reviews", "Hidden Gems", "Exclusive Tours", "Eco-Friendly", "Local Experiences"];

  // Mock data for each state
  const stateData = {
    Goa: {
      name: "Discover Goa's Latest Treasures",
      description: "From pristine beaches to cultural experiences, explore what's new in Goa.",
      attractions: [
        {
          id: "goa1",
          name: "Butterfly Conservatory",
          type: "Attractions",
          description: "Newly opened sanctuary with over 100 butterfly species",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Attractions", "Eco-Friendly"]
        },
        {
          id: "goa2",
          name: "Backwater Kayaking Tour",
          type: "Exclusive Tours",
          description: "Paddle through serene mangroves with local guides",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Exclusive Tours", "Eco-Friendly", "Local Experiences"]
        },
        {
          id: "goa3",
          name: "Hidden Spice Farm",
          type: "Hidden Gems",
          description: "Family-run spice plantation with cooking classes",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Hidden Gems", "Local Experiences"]
        },
        {
          id: "goa4",
          name: "Dinner with Goan Family",
          type: "Local Experiences",
          description: "Authentic home-cooked meal and cultural exchange",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences"]
        },
        {
          id: "goa5",
          name: "Divar Island Cycling Tour",
          type: "Eco-Friendly",
          description: "Explore rural Goa on this guided bicycle tour",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Eco-Friendly", "Hidden Gems"]
        }
      ]
    },
    Kerala: {
      name: "Kerala's Freshest Experiences",
      description: "God's Own Country continues to amaze with new sustainable initiatives.",
      attractions: [
        {
          id: "kerala1",
          name: "Floating Solar Farm Tour",
          type: "Eco-Friendly",
          description: "Visit India's largest floating solar power plant",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Attractions", "Eco-Friendly"]
        },
        {
          id: "kerala2",
          name: "Secret Waterfall Hike",
          type: "Hidden Gems",
          description: "Trek to an undiscovered cascade in Western Ghats",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Hidden Gems", "Eco-Friendly"]
        },
        {
          id: "kerala3",
          name: "Houseboat Overnight Experience",
          type: "Exclusive Tours",
          description: "Luxurious stay on traditional kettuvallam with local crew",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Exclusive Tours", "Local Experiences"]
        },
        {
          id: "kerala4",
          name: "Spice Route Train Journey",
          type: "Attractions",
          description: "Scenic rail trip through plantations with stops for tastings",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Attractions", "Eco-Friendly"]
        },
        {
          id: "kerala5",
          name: "Fishing Village Cooking Class",
          type: "Local Experiences",
          description: "Learn seafood preparation from coastal community members",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences"]
        }
      ]
    },
    Himachal: {
      name: "Himachal Pradesh's Mountain Wonders",
      description: "New adventures await in the Himalayan foothills.",
      attractions: [
        {
          id: "himachal1",
          name: "Sustainable Mountain Retreat",
          type: "Eco-Friendly",
          description: "Zero-waste lodge with panoramic views",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Eco-Friendly", "Attractions"]
        },
        {
          id: "himachal2",
          name: "Apple Orchard Homestay",
          type: "Local Experiences",
          description: "Live with local farmers during harvest season",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences", "Hidden Gems"]
        },
        {
          id: "himachal3",
          name: "Himalayan Narrow Gauge Railway",
          type: "Attractions",
          description: "UNESCO heritage train with new panoramic coaches",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Attractions"]
        },
        {
          id: "himachal4",
          name: "Secret Hot Springs Trek",
          type: "Hidden Gems",
          description: "Guide-led hike to remote natural thermal pools",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Hidden Gems", "Eco-Friendly"]
        },
        {
          id: "himachal5",
          name: "Shepherd's Trail Experience",
          type: "Exclusive Tours",
          description: "Follow traditional Gaddi herding routes with local guides",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Exclusive Tours", "Local Experiences"]
        }
      ]
    },
    Uttarakhand: {
      name: "Uttarakhand's Spiritual & Natural Highlights",
      description: "Explore new sustainable initiatives in the Land of Gods.",
      attractions: [
        {
          id: "uttarakhand1",
          name: "Silent Valley Meditation Retreat",
          type: "Hidden Gems",
          description: "Newly opened sanctuary for mindfulness practices",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Hidden Gems", "Eco-Friendly"]
        },
        {
          id: "uttarakhand2",
          name: "Himalayan Herb Walk",
          type: "Local Experiences",
          description: "Forest exploration with traditional medicine practitioners",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences", "Eco-Friendly"]
        },
        {
          id: "uttarakhand3",
          name: "Solar-Powered Ropeway",
          type: "Attractions",
          description: "Eco-friendly aerial tramway to mountain viewpoints",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Attractions", "Eco-Friendly"]
        },
        {
          id: "uttarakhand4",
          name: "Valley of Flowers Safari",
          type: "Exclusive Tours",
          description: "Limited access guided tour of the UNESCO biosphere reserve",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Exclusive Tours", "Eco-Friendly"]
        },
        {
          id: "uttarakhand5",
          name: "Traditional Village Lunch",
          type: "Local Experiences",
          description: "Home-cooked meal with Garhwali family",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences"]
        }
      ]
    },
    Rajasthan: {
      name: "Royal Rajasthan's New Experiences",
      description: "The desert state blends tradition with responsible tourism innovations.",
      attractions: [
        {
          id: "rajasthan1",
          name: "Palace Heritage Walking Tour",
          type: "Attractions",
          description: "Newly opened royal quarters with local historians",
          image: "/api/placeholder/400/300",
          isEcoFriendly: false,
          tags: ["Attractions", "Local Experiences"]
        },
        {
          id: "rajasthan2",
          name: "Desert Conservation Safari",
          type: "Eco-Friendly",
          description: "Wildlife spotting with conservation experts",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Eco-Friendly", "Exclusive Tours"]
        },
        {
          id: "rajasthan3",
          name: "Artisan Workshop Visit",
          type: "Local Experiences",
          description: "Learn traditional crafts from master artisans",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Local Experiences"]
        },
        {
          id: "rajasthan4",
          name: "Hidden Stepwell Discovery",
          type: "Hidden Gems",
          description: "Recently restored ancient water structures",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Hidden Gems"]
        },
        {
          id: "rajasthan5",
          name: "Palace On Wheels Luxury Train",
          type: "Exclusive Tours",
          description: "Historic train journey with new sustainable features",
          image: "/api/placeholder/400/300",
          isEcoFriendly: true,
          tags: ["Exclusive Tours", "Attractions"]
        }
      ]
    }
  };
  
  interface Attraction {
    id: string;
    name: string;
    tags: string[];
    image: string;
    [key: string]: any; // Optional, for any extra fields
  }
  type StateKey = keyof typeof stateData;

const isValidState = (state: string): state is StateKey => {
  return state in stateData;
};

if (!isValidState(selectedState)) {
  return <div>State not found</div>; // or handle it however you want
}
  
  

  const toggleFavorite = (id: string | number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  

  const filteredAttractions: Attraction[] = stateData[selectedState].attractions.filter((attraction: Attraction) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tag => attraction.tags.includes(tag));
  });
  

  // Prepare images for the ParallaxScroll component
  const parallaxImages = filteredAttractions.map(attraction => attraction.image);

  return (
    <div className="min-h-screen bg-[#FFF0D1] text-[#664343]">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-b from-[#FFF0D1] to-[#FFEED4]">
        <h1 className="text-5xl font-bold mb-4 text-[#664343]">Community Updates</h1>
        <p className="text-xl max-w-2xl mx-auto text-[#664343]/80">
          Discover the latest attractions, hidden gems, and eco-friendly experiences across India's most beautiful states.
        </p>
      </div>

      {/* State Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 flex space-x-1">
          {states.map((state) => (
            <button
              key={state}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedState === state
                  ? "bg-[#4A6FA5] text-white font-medium"
                  : "hover:bg-[#4A6FA5]/10"
              }`}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filtering */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              selectedTags.includes(tag)
                ? "bg-[#664343] text-white"
                : "bg-white border border-[#664343]/20 hover:border-[#664343]"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* State Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#664343]">{stateData[selectedState].name}</h2>
        <p className="text-[#664343]/70 mt-2">{stateData[selectedState].description}</p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mb-16">
        {filteredAttractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(attraction.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={favorites.includes(attraction.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                    />
                  </button>
                  {attraction.isEcoFriendly && (
                    <div className="absolute bottom-4 left-4 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                      Eco-Friendly
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl">{attraction.name}</h3>
                    <span className="text-xs bg-[#4A6FA5]/10 text-[#4A6FA5] px-2 py-1 rounded-full">
                      {attraction.type}
                    </span>
                  </div>
                  <p className="text-[#664343]/70 mb-4">{attraction.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {attraction.tags.map(tag => (
                      <span key={tag} className="text-xs bg-[#FFF0D1] px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-[#664343]/60">No attractions found with the selected filters.</p>
            <button 
              className="mt-4 bg-[#4A6FA5] text-white px-4 py-2 rounded-md"
              onClick={() => setSelectedTags([])}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Parallax Image Section */}
      {parallaxImages.length >= 3 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#664343]">Visual Exploration</h2>
          <ParallaxScroll images={parallaxImages} />
        </div>
      )}

      {/* Community Initiatives Section */}
      <div className="bg-[#4A6FA5]/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#664343]">Responsible Travel Initiatives</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Eco-Friendly Tours</h3>
              <p className="text-[#664343]/70 text-center">
                Sustainable experiences that minimize environmental impact while maximizing cultural immersion.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Local Experiences</h3>
              <p className="text-[#664343]/70 text-center">
                Connect with communities through home stays, cooking classes, and artisan workshops.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Community Support</h3>
              <p className="text-[#664343]/70 text-center">
                Your bookings directly benefit local communities and help preserve cultural heritage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-3 text-[#664343]">Stay Updated</h3>
          <p className="mb-6 text-[#664343]/70">
            Subscribe to receive the latest community updates, exclusive offers, and responsible travel tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A6FA5]"
            />
            <button className="bg-[#4A6FA5] text-white px-6 py-3 rounded-md hover:bg-[#4A6FA5]/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#664343] text-white py-8 text-center">
        <p>© 2025 Explore Local India. Supporting communities through responsible tourism.</p>
      </footer>
    </div>
  );
}