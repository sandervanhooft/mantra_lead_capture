import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core';
import Component from '../components/lead_capture.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState, Meteor, Collections, Tracker} = context();
  const error = LocalState.get('CREATE_LEAD_ERROR');
  LocalState.set('FORM_STATUS', 'init');
  const formStatus = LocalState.get('FORM_STATUS');
  // Meteor.subscribe('posts.single', postId, () => {
  //   const post = Collections.Posts.findOne(postId);
  //   onData(null, {post});
  // });

  // support latency compensation
  //  we don't need to invalidate tracker because of the
  //  data fetching from the cache.
  // const postFromCache = Tracker.nonreactive(() => {
  //   return Collections.Posts.findOne(postId);
  // });

  // if (postFromCache) {
  //   onData(null, {post: postFromCache});
  // } else {
  //   onData();
  // }
  onData(null, {error, formStatus});

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.leads.create,
  clearErrors: actions.leads.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
