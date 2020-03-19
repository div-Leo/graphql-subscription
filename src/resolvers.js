const posts = require('./postData');
//Resolvers - This are the set of the function defined to get the desired output for the given API
const resolvers = {
  Query:{
    getPosts() {
      return posts;
    },
    getPost(parent, args){
      return posts.filter((post) => {
        const body =  post.body.toLowerCase().includes(args.query.toLowerCase())
        const title =  post.title.toLowerCase().includes(args.query.toLowerCase())
        return body || title;
      })
    }
  },
  
  Mutation:{
    deletePost(parent, args){
      const id = parseInt(args.id, 10);
      const isPostExists = posts.findIndex((post)=> post.id === id);
      if(isPostExists === -1) {
        throw new Error('Post does not exist!');
      }
      //splice will return the index of the removed items from the array object
      const [post] = posts.splice(isPostExists, 1);
      // return post;
      

      return post;
    },
    
    createPost(parent, args) {
      const id = parseInt(args.id, 10);
      const postIndex = posts.findIndex((post)=> post.id === id);
      if(postIndex === -1) {
        posts.push({
          ...args
        })

        return {...args};
      };
      throw new Error('Post with same id already exist!');
    },
    updatePost(parent, args){
      const id = parseInt(args.id, 10);
      const postIndex = posts.findIndex((post)=> post.id === id);
      if (postIndex !== -1) {
        const post = posts[postIndex];
        const updatedPost = {
          ...post,
          ...args
        };
        posts.splice(postIndex, 1, updatedPost);


        return updatedPost;
      }
      throw new Error('Post does not exist!');
    },
  },
}

module.exports = resolvers;