import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import GigCard from '../components/GigCard';

const Home = () => {
  const { api } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async (searchQuery = '') => {
    try {
      setLoading(true);
      const { data } = await api.get(`/gigs?search=${searchQuery}`);
      setGigs(data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Next Gig
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Connect with talented freelancers or find exciting projects
            </p>
            
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for gigs by title..."
                  className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl"
                />
                <button
                  type="submit"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Available Gigs ({gigs.length})
          </h2>
          <button
            onClick={() => {
              setSearch('');
              fetchGigs();
            }}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No gigs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} onBidSuccess={fetchGigs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;