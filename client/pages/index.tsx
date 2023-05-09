import CreatePost from "@/componants/CreatePost";
import PostList from "@/componants/PostList";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <Container>
      <h4>Post microservice project</h4>
      <br />
      <h5>Create Post</h5>
      <CreatePost />
      <br />
      <h5>Posts</h5>
      <PostList />
    </Container>
  );
}
