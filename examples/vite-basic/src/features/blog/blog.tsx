import { Link } from "stellum"

export const Blog = ({ Outlet }) => {
  return(
    <div>
      <p>Ini blog</p>
      <div>
        <Link to="/blog/tech">Tech</Link>
        <Link to="/blog/product">Product</Link>
        <Link to="/blog/home">Home Furnance</Link>
        <Link to="/blog/goverenment">Goverenment</Link>
      </div>
      <Outlet />
    </div>
  )
}

export const BlogCategory = ({ Outlet, params }) => {
  return(
    <div>
      <p>Category: {params?.category}</p>
      <div>
        <Link to="/blog/tech/apple">Tech</Link>
        <Link to="/blog/product/samsung">Product</Link>
        <Link to="/blog/home/sony">Home Furnance</Link>
        <Link to="/blog/goverenment/norwegia">Goverenment</Link>
        <Link to="/blog/goverenment/indonesia">Indonesia</Link>
      </div>
      <Outlet />
    </div>
  )
}

export const BlogPost = ({ params }) => {
  return(
    <div>
      <p>Post: {params?.slug}</p>
    </div>
  )
}
