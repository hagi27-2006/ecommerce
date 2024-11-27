import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [newName, setNewName] = useState(user?.fullName || '');
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState('');

  if (!user) return <p>Loading...</p>;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (fieldToUpdate === 'name') {
        await updateUser({
          firstName: newName, // Clerk may require firstName or lastName instead of fullName
        });
      } else if (fieldToUpdate === 'username') {
        await updateUser({ username: newUsername });
      }
      alert(`${fieldToUpdate.charAt(0).toUpperCase() + fieldToUpdate.slice(1)} updated successfully!`);
      setIsModalOpen(false); // Close the modal after updating
    } catch (error) {
      console.error('Error updating profile:', error); // Log the error for debugging
      alert(`Error updating ${fieldToUpdate}: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">My Profile</h2>

      {/* Display User ID */}
      <div>
        <p><strong>ID:</strong> {user.id}</p>
      </div>

      {/* Display Name */}
      <div>
        <p><strong>Name:</strong> {user.fullName || 'N/A'}</p>
        <button
          onClick={() => { setFieldToUpdate('name'); setIsModalOpen(true); }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
        >
          Change Name
        </button>
      </div>

      {/* Display Username */}
      <div>
        <p><strong>Username:</strong> {user.username || 'N/A'}</p>
        <button
          onClick={() => { setFieldToUpdate('username'); setIsModalOpen(true); }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
        >
          Change Username
        </button>
      </div>

      {/* Display Email */}
      <div>
        <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
      </div>

      {/* Modal for Updating Name/Username */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-96">
            <h2 className="text-lg font-bold">Update {fieldToUpdate.charAt(0).toUpperCase() + fieldToUpdate.slice(1)}</h2>
            <div className="mt-4">
              {fieldToUpdate === 'name' ? (
                <div>
                  <label className="block mb-1 text-sm">New Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-1 text-sm">New Username</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`bg-blue-500 text-white py-2 px-4 rounded-md ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
