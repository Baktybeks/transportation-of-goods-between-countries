import Navigaton from '@/components/Navigation/Navigaton';


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const Header = () => {
  return (
    <header>
      <Navigaton navLinks={navItems}/>
    </header>
  );
};

export default Header;
