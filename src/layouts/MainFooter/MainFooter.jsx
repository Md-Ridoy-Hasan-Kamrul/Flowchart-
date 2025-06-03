import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';

const socialLinks = [
  {
    href: 'https://x.com/BundooraCollege',
    label: 'Twitter',
    Icon: FaTwitter,
  },
  {
    href: 'https://www.facebook.com/BundooraSecondaryCollege',
    label: 'Facebook',
    Icon: GrFacebookOption,
  },
  {
    href: 'https://www.instagram.com/bundoorasecondary',
    label: 'Instagram',
    Icon: FaInstagram,
  },
];

const MainFooter = () => (
  <footer className='bg-background text-gray-300 py-6'>
    <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
      <div
        className='mt-6 text-center text-xs text-white select-none'
        style={{ fontFamily: 'var(--font-secondary)' }}
      >
        &copy; {new Date().getFullYear()} Bundoora. All rights reserved.
      </div>

      <nav className='flex space-x-6 text-2xl' aria-label='Social media links'>
        {socialLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
            className='hover:text-white text-white transition'
          >
            <Icon />
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default MainFooter;
