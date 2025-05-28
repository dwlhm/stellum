import { Link } from 'stellum'

export default function AboutPage({ Outlet }) {
  return(
    <div>
      <p>About Page</p>
      <div>
        <Link to='/about/team/dwlhm'>Tim</Link>
        <Link to='/about/company'>Perusahaan</Link>
        <Link to='/about/dwlhm'>dwlhm</Link>
      </div>
      <Outlet />
    </div>
  )
}
