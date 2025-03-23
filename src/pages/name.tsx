import { useParams } from "../libs/route/params";
import { data } from "../libs/route/routes";

export default function Name() {
  const param = useParams();

  return <div>Namamu iku: {(param as any).name}</div>;
}