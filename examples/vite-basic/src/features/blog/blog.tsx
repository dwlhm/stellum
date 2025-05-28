import { LayoutFunction, Link } from "stellum"

export const Blog: LayoutFunction = ({ Outlet }) => {
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

export const BlogCategory: LayoutFunction = ({ Outlet, params }) => {
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

export const BlogPost: LayoutFunction = ({ params }) => {
  return(
    <div>
      <p>Post: {params?.slug}</p>
    </div>
  )
}
