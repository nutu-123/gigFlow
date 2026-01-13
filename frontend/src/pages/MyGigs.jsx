import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MyGigs = () => {
  const { api } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const { data } = await api.get('/gigs/my-gigs');
      setGigs(data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async (gigId) => {
    try {
      const { data } = await api.get(`/bids/${gigId}`);
      setBids(data);
      setSelectedGig(gigId);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer?')) {
      return;
    }

    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert('Freelancer hired successfully!');
      fetchMyGigs();
      setBids([]);
      setSelectedGig(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Posted Gigs</h1>
          <Link to="/create-gig" className="btn-primary">
            + Post New Gig
          </Link>
        </div>

        {gigs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No gigs posted yet</h3>
            <p className="text-gray-500 mb-6">Start by creating your first gig</p>
            <Link to="/create-gig" className="btn-primary">
              Create Your First Gig
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gigs.map((gig) => (
              <div key={gig._id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{gig.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      gig.status === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gig.status === 'open' ? '🟢 Open' : '🔒 Assigned'}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg font-bold">
                    ${gig.budget}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>

                <button
                  onClick={() => fetchBids(gig._id)}
                  className="btn-primary w-full"
                >
                  View Bids
                </button>

                {selectedGig === gig._id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-lg mb-4">Bids ({bids.length})</h4>
                    
                    {bids.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No bids yet</p>
                    ) : (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {bids.map((bid) => (
                          <div key={bid._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-semibold text-gray-800">{bid.freelancerId.name}</p>
                                <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600 text-lg">${bid.price}</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                                  bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  bid.status === 'hired' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {bid.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{bid.message}</p>
                            
                            {bid.status === 'pending' && gig.status === 'open' && (
                              <button
                                onClick={() => handleHire(bid._id)}
                                className="btn-primary w-full"
                              >
                                Hire {bid.freelancerId.name}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;