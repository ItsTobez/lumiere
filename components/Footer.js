import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='mt-96 bg-gray-700 border-t border-gray-600 pt-14 pb-10'>
      <div className='container'>
        <nav className='flex justify-between text-sm leading-loose text-gray-500'>
          <ul>
            <h3 className='heading-tertiary'>Media</h3>
            <li>Lumiere Press</li>
            <li>Lumiere Channel</li>
            <li>About Media</li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Resources</h3>
            <li>Guides</li>
            <li>Support</li>
            <li>Contact Us</li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Company</h3>
            <li>Home</li>
            <li>Blog</li>
            <li>Team</li>
            <li>Join Us</li>
            <li>Brand</li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Legal</h3>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </nav>

        <figure className='flex items-center mt-16 cursor-default select-none'>
          <div className='relative w-7 h-7 mr-2 mb-1'>
            <Image
              src={projectLumiere}
              alt='Project Lumiere logo'
              layout='fill'
              objectFit='contain'
            />
          </div>
          <figcaption className='text-gray-200 text-xl font-semibold'>
            Lumiere
          </figcaption>
        </figure>

        <div className='mt-4 flex justify-between items-center text-gray-500'>
          <p className='text-sm'>
            Copyright &copy; 2021 Project Lumiere. All rights reserved.
          </p>
          <div className='flex'>
            <FaLinkedin className='w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors' />
            <div className='border-r border-gray-600 mx-3' />
            <FaGithub className='w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors' />
          </div>
        </div>
      </div>
    </footer>
  );
}
