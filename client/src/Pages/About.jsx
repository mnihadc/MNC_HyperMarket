import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className='pt-24 pb-10 px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col items-center'>
      <div className="mb-4 self-start">
        <Link to={'/profile'}>
          <button className='text-5xl p-1 bg-slate-400 rounded-lg'>&#8592;</button>
        </Link>
      </div>
      <div className='bg-gray-200 p-8 rounded-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2'>
        <h1 className='text-2xl font-semibold mb-4'>About Page</h1>
        <div>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold'>Company Details:</h2>
            <p className='mt-2'>
              MultiNational Company (MNC) Hypermarket is a leading organization headquartered in Kerala, India. Established in 2006, we have grown to become a prominent name in the retail sector, specializing in hypermarkets and supermarkets. Our commitment to excellence and customer satisfaction has propelled us to the forefront of the industry. With a vast network of stores across India, we cater to diverse consumer needs and preferences.
            </p>
          </div>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold'>Owners, Chairman, and CEO:</h2>
            <p className='mt-2'>
              Our company is led by a dynamic team of visionaries. PN Muhammad serves as our esteemed Chairman, providing strategic direction and leadership. Assisting him is Suhail, the Assistant Chairman, who contributes invaluable insights and support. At the helm of operations is Adil and Jazeem, our CEO, whose innovative approach drives our success. Together, they form the backbone of our organization, steering us towards greater achievements.
            </p>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Website Information:</h2>
            <p className='mt-2'>
              In 2018, we launched our website, revolutionizing the way customers interact with us. Our online platform offers convenience and accessibility, allowing shoppers from all corners of India to browse and purchase a wide range of products. With our extensive presence in every state, district, and sub-district, we bring the hypermarket experience to your doorstep. Whether you're in bustling cities or remote areas, our stores are strategically positioned to meet your needs. With just a few clicks, you can explore our vast inventory and place orders with ease, ensuring a seamless shopping experience from start to finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
