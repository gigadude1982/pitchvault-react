import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router';
import App from './App';
import AuthView from './views/AuthView';
import DiscoverView from './views/DiscoverView';
import CampaignView from './views/CampaignView';
import MessagesView from './views/MessagesView';
import PaymentsView from './views/PaymentsView';
import AnalyticsView from './views/AnalyticsView';
import CreatorView from './views/CreatorView';
import CreatorProfileView from './views/CreatorProfileView';
import ProductsView from './views/ProductsView';
import SubscriptionView from './views/SubscriptionView';

const rootRoute = createRootRoute({ component: App });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/auth' });
  },
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthView,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feed',
  component: DiscoverView,
});

const requestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/request',
  component: CampaignView,
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/messages',
  component: MessagesView,
});

const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payments',
  component: PaymentsView,
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: AnalyticsView,
});

const creatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator',
  component: CreatorView,
});

const creatorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creators/$id',
  component: CreatorProfileView,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsView,
});

const subscribeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscribe',
  component: SubscriptionView,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  feedRoute,
  requestRoute,
  messagesRoute,
  paymentsRoute,
  statsRoute,
  creatorRoute,
  creatorProfileRoute,
  productsRoute,
  subscribeRoute,
]);

export const router = createRouter({ routeTree });
