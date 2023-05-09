import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";

interface formFields {
  title: string;
}

const CreatePost = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (
      values: formFields,
      { setSubmitting }: FormikHelpers<formFields>
    ) => {
      const res = await axios.post("http://posts.com/post/create", {
        ...formik.values,
      });

      if (res.status === 201) [formik.resetForm()];
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ente you title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

export default CreatePost;
