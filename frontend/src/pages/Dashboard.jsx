import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { api, user } = useContext(AuthContext);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const { data } = await api.get('/bids/my/bids');
      setMyBids(data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  const pendingBids = myBids.filter(b => b.status === 'pending');
  const hiredBids = myBids.filter(b => b.status === 'hired');
  const rejectedBids = myBids.filter(b => b.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Track all your bids and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Bids</p>
                <p className="text-4xl font-bold">{pendingBids.length}</p>
              </div>
              <div className="text-6xl opacity-50">⏳</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Hired</p>
                <p className="text-4xl font-bold">{hiredBids.length}</p>
              </div>
              <div className="text-6xl opacity-50">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Rejected</p>
                <p className="text-4xl font-bold">{rejectedBids.length}</p>
              </div>
              <div className="text-6xl opacity-50">❌</div>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bids</h2>

          {myBids.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No bids yet</h3>
              <p className="text-gray-500">Start bidding on projects to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myBids.map((bid) => (
                <div key={bid._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {bid.gigId?.title || 'Gig Not Available'}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {bid.gigId?.description || 'Description not available'}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-2xl font-bold text-green-600">${bid.price}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        bid.status === 'hired' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bid.status === 'pending' ? '⏳ Pending' :
                         bid.status === 'hired' ? '✅ Hired' :
                         '❌ Rejected'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Your Proposal:</p>
                    <p className="text-gray-600">{bid.message}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Submitted: {new Date(bid.createdAt).toLocaleDateString()}</span>
                    <span>Budget: ${bid.gigId?.budget || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;