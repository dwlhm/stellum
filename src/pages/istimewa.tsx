import { useParams } from "../libs/route/params";

export const Istimewa = () => {
  const params = useParams();

  return (
    <div>
      <p>Istimewa</p>
      <p>{JSON.stringify(params)}</p>
    </div>
  );
};
