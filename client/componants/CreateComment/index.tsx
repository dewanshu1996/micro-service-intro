import axios from "axios";
import { FormikHelpers, useFormik } from "formik";
import { Button, Form } from "react-bootstrap";

interface formFields {
  content: string;
}

const CreateComment = (props: any) => {
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (
      values: formFields,
      { setSubmitting }: FormikHelpers<formFields>
    ) => {
      const res = await axios.post(
        `http://posts.com/post/${props.postId}/comment`,
        {
          ...formik.values,
        }
      );

      if (res.status === 201) [formik.resetForm()];
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ente the comment"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

export default CreateComment;
