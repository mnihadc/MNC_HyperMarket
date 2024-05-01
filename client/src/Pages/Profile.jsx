import React from 'react';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart, signInFailure, signoutUserSuccess,
} from '../redux/user/userSlice.js';

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    password: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='p-24 max-w-2xl mx-auto bg-gray-100 rounded-lg'>
      <h1 className='text-3xl font-semibold text-center text-blue-800 mb-6'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={(formData && formData.avatar) || (currentUser && currentUser.avatar) || ''}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image Upload (image must be 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-green-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image Successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <div className='relative'>
          <input
            defaultValue={currentUser.username}
            type='text'
            placeholder='username'
            className='border-5 p-3 rounded-lg'
            id='username'
            style={{ width: '85%' }} 
            onChange={handleChange}
            disabled={!editableFields.username}
          />
          {!editableFields.username && (
            <button
              type='button'
              onClick={() => handleEdit('username')}
              className='absolute right-0 top-0 mt-3  text-blue-600 hover:text-blue-800'
            >
              Edit
            </button>
          )}
        </div>
        <div className='relative'>
          <input
            defaultValue={currentUser.email}
            type='email'
            placeholder='email'
            id='email'
            style={{ width: '85%' }} 
            onChange={handleChange}
            className='border-5 p-3 rounded-lg'
            disabled={!editableFields.email}
          />
          {!editableFields.email && (
            <button
              type='button'
              onClick={() => handleEdit('email')}
              className='absolute right-0 top-0 mt-3  text-blue-600 hover:text-blue-800'
            >
              Edit
            </button>
          )}
        </div>
        <div className='relative'>
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            id='password'
            style={{ width: '85%' }} 
            className='border-5  p-3 rounded-lg'
            disabled={!editableFields.password}
          />
          {!editableFields.password && (
            <button
              type='button'
              onClick={() => handleEdit('password')}
              className='text-sm text-blue-600 ml-3 hover:text-blue-800'
            >
              Change Password
            </button>
          )}
        </div>

        <button
          disabled={loading}
          className='bg-blue-500 text-white rounded-lg p-3 text-lg uppercase hover:bg-blue-800 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign-Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully' : ''}</p>
    </div>
  );
}

export default Profile;
