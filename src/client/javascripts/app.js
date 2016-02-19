import $ from 'jquery';
import debug from 'debug';

// import stateTemplate from '../html/shared/state.html';

const dbg = debug('sc2bo:app');
const $state = $('.content');

$.getJSON(`/config`, config => {
  dbg(config);
});
