import { ResultItem } from '@/interfaces/apiresults';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Card, YStack, Paragraph, Image, Text } from 'tamagui';

type MovieCardProps = {
  movie: ResultItem;
};

const MovieCard = ({ movie }: MovieCardProps) => (
  <Link
    href={`/(drawer)/home/${movie.media_type === 'movie' ? 'movie' : 'tv'}/${movie.id}`}
    asChild>
    <Card
      elevate
      width={150}
      height={260}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.975 }}
      animation={'bouncy'}>
      <Card.Header p={0}>
        <Animated.Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
          alt={movie.title}
          style={{ width: 150, height: 200 }}
          sharedTransitionTag={`${movie.media_type === 'movie' ? 'movie' : 'tv'}-${movie.id}`}
        />
      </Card.Header>
      <Card.Footer p={8}>
        <YStack>
          <Text fontSize={20} color={'lightblue'}>
            {movie.title || movie.name}
          </Text>
          <Paragraph theme={'alt2'}>
            {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
          </Paragraph>
        </YStack>
      </Card.Footer>
    </Card>
  </Link>
);

export default MovieCard;
