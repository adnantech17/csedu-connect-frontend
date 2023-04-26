import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Loader from 'src/components/container/Loader';
import { FormBuilder, Input, Textarea } from 'src/components/forms/FormBuilder';
import BlogPostCard from 'src/components/shared/BlogPostCard';
import FormModalButton from 'src/components/tables/FormModalButton';
import { createBlog, getBlogs } from 'src/services/query/blogs';
import { getFullName, getShortDetails } from 'src/views/utilities/utils';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllBlogs = async (data) => {
    setLoading(true);
    try {
      const res = await getBlogs(data);
      setBlogs(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      await createBlog({ ...data, tags: [] });
      setOpen(false);
      const res = await getBlogs({});
      setBlogs(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      <FormModalButton
        className="d-flex m-3 justify-content-end"
        buttonTitle="+ New Blog"
        heading="Create a New Blog"
        onSubmit={() => {}}
        open={open}
        setOpen={setOpen}
      >
        <FormBuilder onSubmit={handleCreate}>
          {(register, errors, { control }) => {
            return (
              <>
                <div className="row mt-3">
                  <Input
                    name="title"
                    register={register}
                    errors={errors}
                    required={true}
                    class_name="col-12"
                    label={'Blog Title'}
                  />
                  <Textarea
                    name="content"
                    register={register}
                    errors={errors}
                    required={true}
                    class_name="col-12"
                    label={'Blog Description'}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </>
            );
          }}
        </FormBuilder>
      </FormModalButton>
      <Grid container spacing={6}>
        <Loader isLoading={loading}>
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            <Typography variant="h5">Blogs</Typography>
          </Grid>
          {blogs?.map((blog) => (
            <Grid item xs={12} sm={12} md={4}>
              <BlogPostCard
                id={blog.id}
                title={blog.title}
                author={getFullName(blog.user)}
                short_details={getShortDetails(blog.content_head, 150)}
                image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              />
            </Grid>
          ))}
        </Loader>
      </Grid>
    </>
  );
};

export default Blogs;
