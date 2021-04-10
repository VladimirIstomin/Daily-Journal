const express = require('express');

const app = express();

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

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {homeContent: homeContent});
});

app.get('/about', (req, res) => {
    res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', (req, res) => {
    res.render('contact', {contactContent: contactContent});
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
    }

    console.log(post);
});

app.listen(process.env.PORT || 3000, () => console.log('The application has been started!'));
