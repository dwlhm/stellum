import { Outlet } from "../libs/route/outlet";
import { useParams } from "../libs/route/params";
import { data } from "../libs/route/routes";

export default function About() {
  const param = useParams();

  return (
    <div>
      <p>Param Dinamis {(param as any).id}</p>
      <Outlet />
    </div>
  );
}
