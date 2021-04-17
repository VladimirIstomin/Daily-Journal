const express = require('express');
const mongoose = require('mongoose');

//#region  Basic content

const homeContent = 'Mauris sagittis aliquam tellus, nec imperdiet leo luctus vitae. Integer eget faucibus erat, id luctus ante. \
Morbi sit amet ex at augue viverra tempus ut sit amet felis. Praesent neque nisl, tristique sit amet tortor in, malesuada pharetra dui. \
Sed posuere cursus efficitur. Cras lorem turpis, accumsan vel accumsan maximus, hendrerit et est. Orci varius natoque penatibus et magnis \
dis parturient montes, nascetur ridiculus mus. Quisque ultricies, felis id scelerisque finibus, arcu diam scelerisque erat, vel bibendum mi \
nunc vitae leo. Aliquam accumsan mauris sed pulvinar consequat. Praesent aliquet consectetur risus, at cursus augue congue sit amet. Proin mattis \
vestibulum purus et finibus. Proin id egestas nisi. Suspendisse eget eleifend magna. Quisque fringilla nisl maximus augue tempor iaculis in eu \
purus. Nulla orci sem, porttitor vel blandit a, ultrices vel arcu.'

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet quam id risus ultricies, ornare finibus mauris \
consectetur. In hendrerit lorem ut ligula ornare rhoncus. Pellentesque nisi lacus, vehicula sit amet sagittis a, sagittis vitae velit. Ut quis \
tristique nulla, et venenatis metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis mi vel vehicula dapibus. Suspendisse \
potenti.'

const contactContent = 'Praesent in nisi sapien. Nam eu dapibus nibh. Morbi non dolor tellus. Etiam rhoncus, nibh quis tempor ultricies, est elit \
pulvinar orci, ut vulputate ligula magna et mauris. Donec ac accumsan sem. Curabitur condimentum faucibus tincidunt. Integer est leo, interdum \
venenatis nunc non, blandit posuere elit. Vivamus pharetra diam a lectus sodales, in mollis justo tincidunt. Pellentesque habitant morbi tristique \
senectus et netus et malesuada fames ac turpis egestas. Maecenas molestie volutpat sagittis.'

//#endregion

//#region Express configuration

const app = express();
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//#endregion

//#region DB connection

mongoose.connect('mongodb+srv://vladimiristomin:<password>@general.xpdaq.mongodb.net/General?retryWrites=true&w=majority', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const postSchema = mongoose.Schema(
    {
        title: String,
        content: String
    }
);

const Post = mongoose.model('Post', postSchema);

//#endregion

//#region Requests

app.get('/', (req, res) => {
    Post.find({}, (err, postsList) => {
        if (!err) {
            res.render('home', {
                homeContent: homeContent,
                posts: postsList
            });
        } else {
            console.log(err);
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        aboutContent: aboutContent
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        contactContent: contactContent
    });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', async (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    // await Post.create(post); // crate is an analogue for insertOne

    await post.save((err, result) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    let posts;

    await Post.find({}, (err, postsList) => {
        if (!err) {
            posts = postsList;
        } else {
            console.log(err);
        }
    });

    console.log(typeof(postId));

    if (posts.some(
        post => {
            if (post._id == postId) { // post._id is an Object, which means, that types should be converted
                res.render('post', {
                    postTitle: post.title,
                    postContent: post.content
                });

                return true;
            }

            return false;
        }
    ));
});

//#endregion

app.listen(process.env.PORT || 3000, () => console.log('The application has been started!'));
