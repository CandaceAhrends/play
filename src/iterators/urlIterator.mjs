import axios from 'axios';

const wait = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 1000);
  });
};

/*

  const urlList = [
    {url: '', key: 'first url key'},
    {url:...}
  ]

*/

export const createUrlGetIterator = (urlList) => {
  const AsynUrlIterator = {
    requestList: [...urlList],
    async *[Symbol.asyncIterator]() {
      while (this.requestList.length) {
        try {
          const { url, key } = this.requestList.pop();
          const res = await axios.get(url);
          await wait();
          yield { results: res.data?.results, key };
        } catch (error) {
          yield { error };
        }
      }
    },
  };
  return AsynUrlIterator;
};

export const createUrlPostDBIterator = (urlList) => {
  const AsynUrlIterator = {
    requestList: [...urlList],
    async *[Symbol.asyncIterator]() {
      while (this.requestList.length) {
        try {
          const { url, key, data } = this.requestList.pop();
          await axios.post(url, data);
          await wait();
          yield { success: true };
        } catch (error) {
          yield { success: false };
        }
      }
    },
  };
  return AsynUrlIterator;
};
