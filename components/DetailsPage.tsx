import { MediaType } from '@/interfaces/apiresults';
import { ImageBackground } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/services/api';
import { Main } from '@/tamagui.config';
import { H1, Button, ScrollView, YStack, Text, Paragraph, useTheme } from 'tamagui';
import Animated from 'react-native-reanimated';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useMMKVObject } from 'react-native-mmkv';
import { Favorite } from '@/interfaces/favorites';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};
const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  const theme = useTheme();

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  const toggleFavorite = () => {
    const current = favorites || [];

    if (!isFavorite) {
      setFavorites([
        ...current,
        {
          id,
          mediaType,
          thumb: movieQuery.data?.poster_path,
          name: movieQuery.data?.title || movieQuery.data?.name,
        },
      ]);
    } else {
      setFavorites(current.filter((fav) => fav.id !== id || fav.mediaType !== mediaType));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              unstyled
              onPress={toggleFavorite}
              scale={0.95}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.975 }}
              animation={'bouncy'}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={theme.blue9.get()}
              />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}>
          <Animated.Image
            borderRadius={6}
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}`,
            }}
            style={{ width: 200, height: 300, margin: 10 }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />
        </ImageBackground>

        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name} <Text fontSize={16}>(2023)</Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};
export default DetailsPage;
