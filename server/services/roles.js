import mongoose from 'mongoose';
const University = mongoose.model('universities');
const Category = mongoose.model('categories');

export const ADMIN = 'ADMIN';
export const MEMBER = 'MEMBER';

export default async (userId, kind, data) => {
  switch (kind) {
    case ADMIN: {
      const { name, university: universityId, category: categoryId } = data;

      const { name: university } = await University.findById(universityId);
      const { name: category } = await Category.findById(categoryId);

      return {
        user: new mongoose.mongo.ObjectId(userId),
        role: 'admin',
        roleDescription: `Założyciel inicjatywy "${name}" działającej na uczelni ${university}, obszarze ${category}`
      };
    }
    case MEMBER: {
      const { name, university: universityId, category: categoryId } = data;

      const { name: university } = await University.findById(universityId);
      const { name: category } = await Category.findById(categoryId);

      return {
        user: new mongoose.mongo.ObjectId(userId),
        role: 'member',
        roleDescription: `Członek inicjatywy "${name}" działającej na uczelni ${university}, obszarze ${category}`
      };
    }
  }
}
