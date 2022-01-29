import urls from './urls';

export const resetUrls = async () => {
  try {
    await urls.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

export const addUrl = async () => {
  try {
    await urls.create({
      fullUrl: 'https://www.google.com',
      shortUrl: 'test1234',
    });
  } catch (error) {
    console.log(error);
  }
};
