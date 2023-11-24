import DetailsPage from '@/components/DetailsPage';
import { MediaType } from '@/interfaces/apiresults';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};
export default Page;
