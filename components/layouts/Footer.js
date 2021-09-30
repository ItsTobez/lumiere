import Image from 'next/image';
import Link from 'next/link';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gray-800 border-t border-gray-700 pt-14 pb-4'>
      <div className='container'>
        <nav className='flex justify-between text-sm leading-loose text-gray-500 transition-colors duration-75'>
          <ul>
            <h3 className='heading-tertiary'>Media</h3>
            <li>
              <Link href='/press'>
                <a className='hover:text-gray-400'>Lumiere Press</a>
              </Link>
            </li>
            <li>
              <Link href='/channel'>
                <a className='hover:text-gray-400'>Lumiere Channel</a>
              </Link>
            </li>
            <li>
              <Link href='/media'>
                <a className='hover:text-gray-400'>About Media</a>
              </Link>
            </li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Resources</h3>
            <li>
              <Link href='/resources/guides'>
                <a className='hover:text-gray-400'>Guides</a>
              </Link>
            </li>
            <li>
              <Link href='/changelog'>
                <a className='hover:text-gray-400'>Changelog</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a className='hover:text-gray-400'>Contact Us</a>
              </Link>
            </li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Company</h3>
            <li>
              <Link href='/'>
                <a className='hover:text-gray-400'>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/company/blog'>
                <a className='hover:text-gray-400'>Blog</a>
              </Link>
            </li>
            <li>
              <Link href='/company/team'>
                <a className='hover:text-gray-400'>Team</a>
              </Link>
            </li>
            <li>
              <Link href='/company/careers'>
                <a className='hover:text-gray-400'>Join Us</a>
              </Link>
            </li>
            <li>
              <Link href='/company/brand'>
                <a className='hover:text-gray-400'>Brand</a>
              </Link>
            </li>
          </ul>
          <ul>
            <h3 className='heading-tertiary'>Legal</h3>
            <li>
              <Link href='/legal/privacy'>
                <a className='hover:text-gray-400'>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href='/legal/terms'>
                <a className='hover:text-gray-400'>Terms of Service</a>
              </Link>
            </li>
          </ul>
        </nav>

        <figure className='flex items-center mt-14 cursor-default select-none'>
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

        <div className='flex justify-between items-center text-gray-500'>
          <p className='text-xs'>
            &copy; 2021 Project Lumiere 501(c)(3). All rights reserved.
          </p>
          <iframe
            src='https://projectlumiere.instatus.com/embed-status/dark-md'
            width='230'
            height='61'
            frameBorder='0'
            scrolling='no'
            style={{ borderStyle: 'none', borderWidth: 0 }}
          ></iframe>
          <div className='flex'>
            <a
              href='https://www.linkedin.com/company/project-lumiere'
              target='_blank'
              rel='noreferrer noopener'
            >
              <FaLinkedin className='w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors duration-75' />
            </a>
            <div className='border-r border-gray-700 mx-3' />
            <a
              href='https://github.com/AnthonyKuang/ProjectLumiere'
              target='_blank'
              rel='noreferrer noopener'
            >
              <FaGithub className='w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors duration-75' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
