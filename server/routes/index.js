import cities from './cities';
import categories from './categories';
import authRoutes from './authRoutes';
import initiatives from './initiatives';
import users from './users';

export default app => {
  cities(app);
  categories(app);
  authRoutes(app);
  initiatives(app);
  users(app);
};
