const ENV = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  OPEN_API_BASE_URL: process.env.REACT_APP_OPEN_API_BASE_URL,
  WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL,
};


const LoadingStatus = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const PAGE_SIZE = 10;

export {
  ENV,
  LoadingStatus,
  PAGE_SIZE,
};
