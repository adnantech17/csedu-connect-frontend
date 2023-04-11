// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormBuilder, Input, Textarea } from 'src/components/forms/FormBuilder'
import BlogPostCard from 'src/components/shared/BlogPostCard'
import FormModalButton from 'src/components/tables/FormModalButton'


const Blogs = () => {
  return (
    <>
      <FormModalButton
        className='d-flex m-3 justify-content-end'
        buttonTitle='+ New Blog'
        heading='Create a New Blog'
        onSubmit={() => {}}
      >
        <FormBuilder
          onSubmit={d => {
            console.log(d)
          }}
        >
          {(register, errors, { control }) => {
            return (
              <>
                <div className='row mt-3'>
                  <Input
                    name='title'
                    register={register}
                    errors={errors}
                    required={true}
                    class_name='col-12'
                    label={'Blog Title'}
                  />
                  <Textarea
                    name='description'
                    register={register}
                    errors={errors}
                    required={true}
                    class_name='col-12'
                    label={'Blog Description'}
                  />
                </div>
              </>
            )
          }}
        </FormBuilder>
      </FormModalButton>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>Blogs</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BlogPostCard
            title='Sample Blog'
            author='Adnan Ali'
            short_details='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!'
            image='https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BlogPostCard
            title='Sample Blog'
            author='Adnan Ali'
            short_details='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!'
            image='https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BlogPostCard
            title='Sample Blog'
            author='Adnan Ali'
            short_details='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!'
            image='https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BlogPostCard
            title='Sample Blog'
            author='Adnan Ali'
            short_details='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!'
            image='https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BlogPostCard
            title='Sample Blog'
            author='Adnan Ali'
            short_details='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!'
            image='https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Blogs
