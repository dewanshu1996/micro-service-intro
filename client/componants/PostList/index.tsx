import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import React from "react";
import CreateComment from "../CreateComment";
import ListComments from "../ListComment";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get("http://posts.com/posts");
        if (res.status === 200) {
          setPosts(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fun();
  }, []);

  const renderingPosts = Object.values(posts).map((post: any) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{post.title}</Card.Text>
          <ListComments postId={post.id} comments={post.comments} />
          <br />
          <CreateComment postId={post.id} />
        </Card.Body>
      </Card>
    );
  });

  return (
    <Stack direction="horizontal" gap={3}>
      {renderingPosts}
    </Stack>
  );
};

export default PostList;
