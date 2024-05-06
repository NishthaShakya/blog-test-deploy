import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',   //display name of nav item'home'
      slug: "/", //route to which nav item links
      active: true  //navitem must be active
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, //login activated when user is not logged in(not authenicated .i.e, not user not logged in)
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, //same
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, //when user is authenticated
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow-xl bg-indigo-400'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='50px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock te px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (        //authstatus true
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header