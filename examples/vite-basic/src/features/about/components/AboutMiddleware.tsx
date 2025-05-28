export const AboutMiddleware = ({ params }) => {
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
