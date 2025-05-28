import { Middleware } from "stellum"

export const AboutMiddleware: Middleware = ({ params }) => {
  if (params?.user === 'dwlhm') {
    return {
      MiddlewareComponent: () => <p>Hallo Tuan</p>,
      context: {
        isAdmin: true,
      },
    }
  }
  
  return {
    context: {
      isAdmin: false,
    },
  }
}
