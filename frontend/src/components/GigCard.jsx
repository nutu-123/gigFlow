import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BidModal from './BidModal';

const GigCard = ({ gig, showBidButton = true, onBidSuccess }) => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const isOwner = user && gig.ownerId._id === user._id;

  return (
    <>
      <div className="card p-6 hover:scale-105 transform transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{gig.title}</h3>
            <p className="text-sm text-gray-500">Posted by: {gig.ownerId.name}</p>
          </div>
          <div className="text-right">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
              ${gig.budget}
            </div>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
              gig.status === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {gig.status === 'open' ? '🟢 Open' : '🔒 Assigned'}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{gig.description}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400">
            Posted: {new Date(gig.createdAt).toLocaleDateString()}
          </p>
          
          {showBidButton && user && !isOwner && gig.status === 'open' && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Place Bid
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <BidModal
          gig={gig}
          onClose={() => setShowModal(false)}
          onSuccess={onBidSuccess}
        />
      )}
    </>
  );
};

export default GigCard;