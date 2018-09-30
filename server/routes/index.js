import moduleLoader from './../utils/moduleLoader';

export default app => moduleLoader(__dirname, ['index.js', 'validators'], app);
