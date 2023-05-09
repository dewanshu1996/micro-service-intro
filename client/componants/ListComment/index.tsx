import axios from "axios";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";

const ListComments = (props: any) => {
  const [comments, setComments] = useState({});

  // useEffect(() => {
  //   const fun = async () => {
  //     const res = await axios.get(
  //       `http://localhost:4001/post/${props.postId}/comments`
  //     );
  //     if (res.status === 200) {
  //       setComments(res.data);
  //     }
  //   };

  //   fun();
  // }, []);

  const renderComments = Object.values(props.comments).map((comment: any) => {
    return <li>{comment.content}</li>;
  });

  return (
    <Stack direction="vertical" gap={3}>
      {renderComments}
    </Stack>
  );
};

export default ListComments;
