import mongoose from 'mongoose';
import roles, { ADMIN, MEMBER } from './roles';
import { removeImage, sendModuleImage } from './Cloudinary';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config/keys';
const { searchInitiative } = require('./../services/search');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const Member = mongoose.model('member');
const University = mongoose.model('universities');
const to = require('./../utils/to');

const shortenInitiativeProfile = async singleInitiative => {
  const { image, name, description, shortUrl, color, modules, facebookUrl } = singleInitiative;

  const [err, university] = await to(University.findById(singleInitiative.university));
  if (err) throw new Error("fetch db error");

  return {
    image: image || 'https://screenshotlayer.com/images/assets/placeholder.png',
    name,
    description,
    color,
    profileCompleted: modules.length >= 3,
    shortUrl,
    university,
    facebookUrl,
  };
};

export const getShortInitiativeProfile = async (page, count, query) => {
  const ITEMS_PER_PAGE = 10;
  if (query?.length) {
    const [err, foundInitiatives] = await to(searchInitiative(query));
    if(err) throw new Error('Mongo err');

    const parsedInitiatives = foundInitiatives.map((singleInitiative) => shortenInitiativeProfile(mapRAWInitiativeObjectToViewReady(singleInitiative)))

    return Promise.all(parsedInitiatives);
  }

  const [err, initiatives] = await to(Initiative.find({}).skip(page * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE));
  if (err) throw new Error("");

  const parsedInitiatives = initiatives.map((singleInitiative) => shortenInitiativeProfile(mapRAWInitiativeObjectToViewReady(singleInitiative)))

  return Promise.all(parsedInitiatives);
};

export const getSingleInitiative = async (shortUrl) => {
  const [err, initiative] = await to(Initiative.findOne({ shortUrl }).lean());
  if(err) throw new Error('Mongo err')

  if (initiative) {
    return mapRAWInitiativeObjectToViewReady(initiative);
  }

  throw new Error('Initiative not found');
};

const parseModule = async (module, initId) => {
  if ( module?.content?.items) {
    const parsedContent = module.content.items.map(async (singleItem) => {
      if (singleItem.image) {
        const { secure_url } = await sendModuleImage(singleItem.image)(initId);
        singleItem.image = secure_url;
      }

      if (singleItem.images) {
        const images = singleItem.images.map(async (item) => {
          if (item.image) {
            const { secure_url } = await sendModuleImage(item.image)(initId);
            item.image = secure_url;
          }
          return item;
        });

        singleItem.images = await Promise.all(images);
      }

      return singleItem;
    });

    module.content.items = await Promise.all(parsedContent);
  }

  return module;
};

export const addInitiativeModule = async (initiativeId, module) => {
  module._id = new mongoose.mongo.ObjectId();
  module = await parseModule(module, initiativeId);

  return Initiative.findByIdAndUpdate(initiativeId, {
    $addToSet: {
      modules: module,
    },
  });
};

export const getAllModules = initiativeId => Initiative.findById(initiativeId).then(result => result.modules);

export const updateModule = (module, initiativeId, moduleId) =>
  new Promise((resolve, reject) => {
    Initiative.findById(initiativeId, (err, initiative) => {
      let newModule;

      const updatedModules = initiative.modules.map((item) => {
        if (String(item._id) === String(moduleId)) {
          newModule = { ...module, _id: new mongoose.mongo.ObjectId() };
          return newModule;
        }
        return item;
      });

      Initiative.findByIdAndUpdate(
        initiativeId,
        {
          $set: {
            modules: updatedModules,
          },
        },
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(newModule);
          }
        },
      );
    });
  });

const deleteSingleModule = async (initiative, modId) => {

  const module = initiative.modules.find(module => module._id.toString() === modId)

  if (module?.content?.items) {
    const parsedContent = module.content.items.map(async (singleItem) => {
      if (singleItem.image) {
        const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(singleItem.image)[1]
        await removeImage(public_id);
      }

      if (singleItem.images) {
        const images = singleItem.images.map(async (item) => {
          if (item.image) {
            const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(item.image)[1]
            await removeImage(public_id);
          }
          return item;
        });

        singleItem.images = await Promise.all(images);
      }

      return singleItem;
    });

    await Promise.all(parsedContent);
  }
};

export const deleteModule = async (initiativeId, moduleId) => {
  const [err, initiative] = await to(Initiative.findById(initId).lean());

  if (initiativeId) {
    deleteSingleModule(initiative)

    return Initiative.findByIdAndUpdate(initiativeId, {
      $pull: {
        modules: {
          _id: new mongoose.mongo.ObjectId(moduleId),
        },
      },
    });
  }
};

export const reorderModules = (initId, modules) => Initiative.findByIdAndUpdate(initId, {
  $set: { modules },
});

export const deleteInitiative = initId => this.Initiative.findByIdAndDelete(initId);

export const assignInitiative = async (userId, initiativeId) => {

  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: initiativeId,
    },
  });

  const initiative = await Initiative.findById(initiativeId);

  return await Initiative.findByIdAndUpdate(initiativeId, {
    $addToSet: {
      members: new Member(roles(userId, MEMBER, initiative))
    }
  })
};

export const mapRAWInitiativeObjectToViewReady = (RAWInitiative) => {
  if (!RAWInitiative.image && RAWInitiative.FBProfile?.logo) {
    RAWInitiative.image = RAWInitiative.FBProfile.logo;
  }

  RAWInitiative.facebookUrl = RAWInitiative.facebookUrl.includes('facebook.com')? RAWInitiative.facebookUrl: `https://www.facebook.com/${RAWInitiative.facebookUrl}`;
  return RAWInitiative;
};

export const changeBasicInitiativeData = (basic, initiativeId) => {
  return mongoose.model('initiatives').findByIdAndUpdate(initiativeId, {
    $set: {
      ...basic,
    },
  });
};

export const validRequestToRestoreInitiative = async (token) => {
  const { userId, initiativeId } = jsonwebtoken.verify(token, config.cookieKey);

  let [err, initiative] = await to(Initiative.findById(initiativeId));
  if (err || !initiative || !userId) throw new Error();

  const newMember = new Member(roles(userId, ADMIN, initiative));
  [err] = await to(Initiative.findByIdAndUpdate(initiativeId, {
    $addToSet: {
      members: newMember,
    },
  }));

  if (err) throw new Error();

  [err] = await to(User.findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: new mongoose.mongo.ObjectId(initiativeId),
    }
  }));

  if (err) throw new Error();
};
