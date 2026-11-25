import {useAuth} from '../auth.jsx';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  const {user,signout}=useAuth();
  const links = [['/','Home'],['/about','About'],['/projects','Projects'],['/education','Education'],['/services','Services'],['/contact','Contact']];
  return <>
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Home"><span className="logo">SP</span><span>Sunhum Park</span></NavLink>
      <nav>{links.map(([to,label]) => <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}{user?<><span>{user.name} ({user.role})</span><button onClick={()=>signout().catch(e=>alert(e.message))}>Sign out</button></>:<><NavLink to='/signup'>Sign Up</NavLink><NavLink to='/signin'>Sign In</NavLink></>}</nav>
    </header>
    <main>{children}</main>
    <footer>© 2026 Sunhum Park · COMP229 React Portfolio</footer>
  </>;
}
