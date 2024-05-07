import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className='pt-24 pb-10 flex justify-center'>
      <Link to={'/profile'}>
        <button className='text-5xl ml-6 p-1  bg-slate-400 rounded-lg '>&#8592;</button>
      </Link>
      <div className='bg-gray-200 p-8 ml-32 mr-32 rounded-lg'>
        <h1 className='text-2xl font-semibold'>About Page</h1>
        <div className='mt-1'>
          <div className='p-2'>
            <h2 className='p-1 mt-2 text-lg font-semibold'>Company Details:</h2>
            <p className='ml-3'>
              MultiNational Company (MNC) Hypermarket is a leading organization headquartered in Kerala, India. Established in 2006, we have grown to become a prominent name in the retail sector, specializing in hypermarkets and supermarkets. Our commitment to excellence and customer satisfaction has propelled us to the forefront of the industry. With a vast network of stores across India, we cater to diverse consumer needs and preferences.
            </p>
          </div>
          <div className='p-2'>
            <h2 className='p-1 text-lg font-semibold'>Owners, Chairman, and CEO:</h2>
            <p className='ml-3'>
              Our company is led by a dynamic team of visionaries. Muhammad  serves as our esteemed Chairman, providing strategic direction and leadership. Assisting him is Suhail, the Assistant Chairman, who contributes invaluable insights and support. At the helm of operations is Adil and Jazeem, our CEO, whose innovative approach drives our success. Together, they form the backbone of our organization, steering us towards greater achievements.
            </p>
          </div>
          <div className='p-2'>
            <h2 className='p-1 text-lg font-semibold'>Website Information:</h2>
            <p className='ml-3'>
              In 2018, we launched our website, revolutionizing the way customers interact with us. Our online platform offers convenience and accessibility, allowing shoppers from all corners of India to browse and purchase a wide range of products. With our extensive presence in every state, district, and sub-district, we bring the hypermarket experience to your doorstep. Whether you're in bustling cities or remote areas, our stores are strategically positioned to meet your needs. With just a few clicks, you can explore our vast inventory and place orders with ease, ensuring a seamless shopping experience from start to finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
