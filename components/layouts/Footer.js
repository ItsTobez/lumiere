import Image from 'next/image';
import Link from 'next/link';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Disclosure, Transition } from '@headlessui/react';

export default function Footer() {
  return (
    <footer className='bg-gray-800 border-t border-gray-700 pt-14 pb-4 md:pt-10'>
      <div className='container'>
        <nav className='flex justify-between text-sm lg:text-xs leading-loose text-gray-500 transition-colors duration-75 md:hidden'>
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
              <Link href='/resources/contributing'>
                <a className='hover:text-gray-400'>Contributing</a>
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
              <Link href='/company/donate'>
                <a className='hover:text-gray-400'>Support Us</a>
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

        <nav className='text-xs text-gray-500'>
          <Disclosure
            as='div'
            className='hidden md:block border-b border-gray-700'
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as='h3'
                  className='heading-tertiary flex justify-between items-center cursor-pointer py-4'
                >
                  <p>Media</p>
                  {open ? (
                    <FiMinus className='w-2.5 h-2.5' />
                  ) : (
                    <FiPlus className='w-2.5 h-2.5' />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel as='ul' className='mt-1 ml-3'>
                  <li>
                    <Link href='/press'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Lumiere Press
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/channel'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Lumiere Channel
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/media'>
                      <a className='hover:text-gray-400 mb-4 block'>
                        About Media
                      </a>
                    </Link>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure
            as='div'
            className='hidden md:block border-b border-gray-700'
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as='h3'
                  className='heading-tertiary flex justify-between items-center cursor-pointer py-4'
                >
                  <p>Resources</p>
                  {open ? (
                    <FiMinus className='w-2.5 h-2.5' />
                  ) : (
                    <FiPlus className='w-2.5 h-2.5' />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel as='ul' className='mt-1 ml-3'>
                  <li>
                    <Link href='/resources/contributing'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Contributing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/changelog'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Changelog
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/contact'>
                      <a className='hover:text-gray-400 mb-4 block'>
                        Contact Us
                      </a>
                    </Link>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure
            as='div'
            className='hidden md:block border-b border-gray-700'
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as='h3'
                  className='heading-tertiary flex justify-between items-center cursor-pointer py-4'
                >
                  <p>Company</p>
                  {open ? (
                    <FiMinus className='w-2.5 h-2.5' />
                  ) : (
                    <FiPlus className='w-2.5 h-2.5' />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel as='ul' className='mt-1 ml-3'>
                  <li>
                    <Link href='/'>
                      <a className='hover:text-gray-400 mb-2 block'>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/company/blog'>
                      <a className='hover:text-gray-400 mb-2 block'>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/company/team'>
                      <a className='hover:text-gray-400 mb-2 block'>Team</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/company/donate'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Support Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/company/brand'>
                      <a className='hover:text-gray-400 mb-4 block'>Brand</a>
                    </Link>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure
            as='div'
            className='hidden md:block border-b border-gray-700'
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as='h3'
                  className='heading-tertiary flex justify-between items-center cursor-pointer py-4'
                >
                  <p>Legal</p>
                  {open ? (
                    <FiMinus className='w-2.5 h-2.5' />
                  ) : (
                    <FiPlus className='w-2.5 h-2.5' />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel as='ul' className='mt-1 ml-3'>
                  <li>
                    <Link href='/legal/privacy'>
                      <a className='hover:text-gray-400 mb-2 block'>
                        Privacy Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/legal/terms'>
                      <a className='hover:text-gray-400 mb-4 block'>
                        Terms of Service
                      </a>
                    </Link>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </nav>

        <section className='md:hidden'>
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

          <div className='flex justify-between items-center text-gray-500 lg:-mt-1'>
            <p className='text-xs lg:text-2xs'>
              &copy; 2021 Project Lumiere 501(c)(3). All rights reserved.
            </p>
            <iframe
              src='https://projectlumiere.instatus.com/embed-status/dark-md'
              width='230'
              height='61'
              frameBorder='0'
              scrolling='no'
              className='transform scale-90 lg:scale-75'
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
        </section>

        <section className='hidden md:block'>
          <figure className='flex items-center mt-12 cursor-default select-none justify-center'>
            <div className='relative w-7 h-7 mr-1 mb-1'>
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

          <iframe
            src='https://projectlumiere.instatus.com/embed-status/dark-md'
            width='230'
            height='61'
            frameBorder='0'
            scrolling='no'
            className='transform scale-75 mx-auto mt-2'
          ></iframe>

          <div className='flex justify-center mt-8'>
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

          <p className='text-2xs text-gray-500 text-center my-4'>
            &copy; 2021 Project Lumiere 501(c)(3). All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}
