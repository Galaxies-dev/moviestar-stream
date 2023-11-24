import { Favorite } from '@/interfaces/favorites';
import { Container, Main } from '@/tamagui.config';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Image, ListItem, ScrollView } from 'tamagui';

const Page = () => {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');

  return (
    <Main>
      <Container>
        <ScrollView>
          {favorites?.map((fav) => (
            <Link key={fav.id} href={`/(drawer)/favorites/${fav.mediaType}/${fav.id}`} asChild>
              <ListItem
                theme={'alt2'}
                title={fav.name}
                size={'$3'}
                icon={() => (
                  <Animated.Image
                    sharedTransitionTag={`${fav.mediaType === 'movie' ? 'movie' : 'tv'}-${fav.id}`}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${fav.thumb}` }}
                    style={{ width: 50, height: 50 }}></Animated.Image>
                )}></ListItem>
            </Link>
          ))}
        </ScrollView>
      </Container>
    </Main>
  );
};
export default Page;
