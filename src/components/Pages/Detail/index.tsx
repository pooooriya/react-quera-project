import { useParams } from "react-router-dom";

interface DetailPageProps {}
const DetailPage: React.FC<DetailPageProps> = (): JSX.Element => {
  const param = useParams();
  return <div>{param.id}</div>;
};

export default DetailPage;
