import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BidModal = ({ gig, onClose, onSuccess }) => {
  const { api } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    message: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/bids', {
        gigId: gig._id,
        message: formData.message,
        price: parseFloat(formData.price)
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Place Your Bid</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{gig.title}</h3>
          <p className="text-gray-600 mb-3">{gig.description}</p>
          <p className="text-lg font-semibold text-green-600">
            Client Budget: ${gig.budget}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Your Bid Amount ($)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-field"
              placeholder="Enter your bid amount"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cover Letter / Proposal
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-field"
              rows="6"
              placeholder="Explain why you're the best fit for this project..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Bid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidModal;