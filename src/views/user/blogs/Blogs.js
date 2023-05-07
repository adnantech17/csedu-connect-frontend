import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Loader from 'src/components/container/Loader';
import {
  FileInput,
  FormBuilder,
  Input,
  RichTextEditor,
  Textarea,
} from 'src/components/forms/FormBuilder';
import BlogPostCard from 'src/components/shared/BlogPostCard';
import ThumbImg from 'src/components/shared/ThumbImg';
import FormModalButton from 'src/components/tables/FormModalButton';
import { createBlog, deleteBlog, getBlogs } from 'src/services/query/blogs';
import { uploadImage } from 'src/services/query/image';
import { getFullName, getShortDetails } from 'src/views/utilities/utils';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
      const imageUrl = await uploadImage(data.image?.[0]);
      await createBlog({ ...data, cover_picture: imageUrl, tags: [] });
      setOpen(false);
      const res = await getBlogs({});
      setBlogs(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBlog(id);
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
    <Loader isLoading={loading}>
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
                  <RichTextEditor
                    control={control}
                    name="content"
                    errors={errors}
                    class_name="col-12"
                    label={'Blog Description'}
                  />

                  <div className="row mt-3">
                    {currentImg && (
                      <ThumbImg
                        src={selectedBlog?.cover_picture}
                        style={{ width: '64px', height: 'auto', objectFit: 'contain' }}
                        onClose={() => {
                          setCurrentImg(null);
                        }}
                      />
                    )}
                    <FileInput
                      name="image"
                      errors={errors}
                      register={register}
                      class_name="col-12"
                      onChange={() => {
                        setCurrentImg(null);
                      }}
                      label={'Cover Picture'}
                    />
                  </div>
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
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant="h5">Blogs</Typography>
        </Grid>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={12} md={4}>
            <BlogPostCard
              handleDelete={handleDelete}
              id={blog.id}
              showDelete={blog.can_delete}
              title={blog.title}
              author={getFullName(blog.user)}
              short_details={getShortDetails(blog.content_head, 150)}
              image={
                blog.cover_picture ||
                'https://www.re-expozitia.ro/wp-content/themes/qube/assets/images/no-image/No-Image-Found-400x264.png'
              }
            />
          </Grid>
        ))}
      </Grid>
    </Loader>
  );
};

export default Blogs;
