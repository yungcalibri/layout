import Box      from './Box/Box.js';
import Center   from './Center/Center.js';
import Cluster  from './Cluster/Cluster.js';
import Cover    from './Cover/Cover.js';
import Frame    from './Frame/Frame.js';
import Grid     from './Grid/Grid.js';
import Icon     from './Icon/Icon.js';
import Impostor from './Impostor/Impostor.js';
import Reel     from './Reel/Reel.js';
import Sidebar  from './Sidebar/Sidebar.js';
import Stack    from './Stack/Stack.js';
import Switcher from './Switcher/Switcher.js';

if ('customElements' in window) {
  const els = [
    ['box-l',      Box],
    ['center-l',   Center],
    ['cluster-l',  Cluster],
    ['cover-l',    Cover],
    ['frame-l',    Frame],
    ['grid-l',     Grid],
    ['icon-l',     Icon],
    ['impostor-l', Impostor],
    ['reel-l',     Reel],
    ['sidebar-l',  Sidebar],
    ['stack-l',    Stack],
    ['switcher-l', Switcher],
  ];
  for ([el, src] in els) {
    customElements.define(el, src);
  }
}
