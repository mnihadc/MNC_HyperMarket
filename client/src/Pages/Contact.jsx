import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <div className='pt-20 pb-10'>
            <Link to={'/profile'}>
                <button className='text-5xl ml-6 p-1 mt-3 bg-slate-400 rounded-lg '>&#8592;</button>
            </Link>
            <div className='flex justify-center'>
                <div className='bg-gray-200 p-8 rounded-lg'>
                    <h1 className='text-2xl font-semibold mb-4'>Contact Page</h1>
                    <div>
                        <p className='mb-4'>
                            For inquiries, you can reach us via email at <a href='mncnihad@gmail.com' className='text-blue-500'>info@example.com</a>.
                        </p>
                        <p>
                            Our office address: <br />
                            123 Main Street, <br />
                            Kochi, <br />
                            Kerala, 672720 <br />
                            Phone: 987456312
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
