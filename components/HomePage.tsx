import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {deleteData, getAllFirestoreDocs} from '../utils/firestore.crud';
import Post from './Post';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {useAppSelector} from '../hooks/reduxHooks';

const HomePage = (props: any) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(state => state.user.user);
  console.log({user});

  const fetchDocuments = async () => {
    try {
      getAllFirestoreDocs('posts', (data: any) => {
        setPosts(data);
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      const response = (await deleteData('posts', id)) as any;
      if (response === null) {
        Toast.show({
          type: 'success',
          text1: 'Post deleted successfully',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Something went wrong',
      });
    }
  };

  const handlePostUpdate = (post: any) => {
    props.navigation.navigate('new-post', {post});
  };

  return (
    <>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <Text style={styles.spinnerText}>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <Text style={styles.heading}>Posts</Text>
          <View style={styles.container}>
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <Post
                  key={post.id}
                  handleDeletePost={handleDeletePost}
                  handlePostUpdate={handlePostUpdate}
                  postId={post.id}
                  post={post}
                />
              ))
            ) : (
              <Text>No Data</Text>
            )}
          </View>
          <LinearGradient
            style={styles.button}
            colors={['#12c2e9', '#c471ed', '#f64f59']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.1, 0.5, 1]}>
            <Pressable
              onPress={() => {
                props.navigation.navigate('new-post');
              }}
              // style={({pressed}: any) => [
              //   styles.button,
              //   {backgroundColor: pressed ? '#999' : '#000'},
              // ]}
            >
              {({pressed}) => (
                <Text
                  style={[styles.buttonText, pressed && styles.textPressed]}>
                  Add New Post
                </Text>
              )}
            </Pressable>
          </LinearGradient>
        </ScrollView>
      )}
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerText: {fontSize: 32},
  scroll: {height: '100%', backgroundColor: '#ddd'},
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
  },
  text: {
    color: '#000',
  },
  btnContainer: {gap: 10, padding: 20},
  postContainer: {
    padding: 10,
    backgroundColor: '#999',
    borderRadius: 10,
    gap: 10,
  },
  author: {
    textAlign: 'right',
    color: '#000',
    fontSize: 12,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textPressed: {
    color: 'black',
  },
});
