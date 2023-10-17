import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const Post = ({post, postId, handleDeletePost, handlePostUpdate}: any) => {
  return (
    <LinearGradient
      colors={['#12c2e9', '#c471ed', '#f64f59']}
      useAngle
      angle={315}
      style={styles.postContainer}
      key={postId}>
      <Text style={styles.author}>
        {moment(post.date).startOf('seconds').fromNow()}
      </Text>
      <Text style={styles.author}>
        {moment.utc(post.date).startOf('seconds').fromNow()}
      </Text>
      <Text style={styles.author}>{moment(post.date).format('lll')}</Text>
      <Text style={styles.text}>{post?.title}</Text>
      <Text style={styles.text}>{post?.description}</Text>
      <Text style={styles.author}>{post?.user}</Text>
      <View style={styles.btnContainer}>
        <Button title="Edit" onPress={() => handlePostUpdate(post)} />
        <Button title="Delete" onPress={() => handleDeletePost(post?.id)} />
      </View>
    </LinearGradient>
  );
};

export default Post;

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
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
  btnContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});
