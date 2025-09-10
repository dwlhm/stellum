import { Link } from 'stellum';

export default function HomePage() {
  return(
    <div>
      <p>Hello World!</p>
      <div>
        <Link to='/about'>About Page</Link>
      </div>
    </div>
  )
}
