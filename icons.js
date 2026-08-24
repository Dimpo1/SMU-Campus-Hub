// Lightweight inline-SVG icon set, styled after the Lucide icon set (MIT licensed).
// No npm install needed — everything here is plain React + SVG so this file
// can be dropped straight into a GitHub Pages site.

const BaseIcon = ({ size = 20, color = 'currentColor', strokeWidth = 2, fill = 'none', style, children, ...rest }) => (
  React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: fill,
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style,
      ...rest,
    },
    children
  )
);

const P = (d) => React.createElement('path', { d });
const L = (x1, y1, x2, y2) => React.createElement('line', { x1, y1, x2, y2 });
const C = (cx, cy, r) => React.createElement('circle', { cx, cy, r });
const RC = (x, y, w, h, rx) => React.createElement('rect', { x, y, width: w, height: h, rx });
const EL = (cx, cy, rx, ry) => React.createElement('ellipse', { cx, cy, rx, ry });

const Icons = {
  Menu: (p) => React.createElement(BaseIcon, p, [L(3, 6, 21, 6), L(3, 12, 21, 12), L(3, 18, 21, 18)]),
  X: (p) => React.createElement(BaseIcon, p, [L(18, 6, 6, 18), L(6, 6, 18, 18)]),
  Search: (p) => React.createElement(BaseIcon, p, [C(11, 11, 7), L(21, 21, 16.65, 16.65)]),
  Calendar: (p) => React.createElement(BaseIcon, p, [RC(3, 4, 18, 18, 2), L(16, 2, 16, 6), L(8, 2, 8, 6), L(3, 10, 21, 10)]),
  MapPin: (p) => React.createElement(BaseIcon, p, [P('M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'), C(12, 10, 3)]),
  Sparkles: (p) => React.createElement(BaseIcon, p, [P('M12 2 l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8Z'), P('M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z')]),
  Building2: (p) => React.createElement(BaseIcon, p, [RC(4, 3, 10, 18, 1), RC(14, 9, 6, 12, 1), L(8, 7, 8, 7), L(8, 11, 8, 11), L(8, 15, 8, 15), L(11, 7, 11, 7), L(11, 11, 11, 11), L(11, 15, 11, 15)]),
  Mail: (p) => React.createElement(BaseIcon, p, [RC(2, 4, 20, 16, 2), P('M2 6l10 7L22 6')]),
  Phone: (p) => React.createElement(BaseIcon, p, [P('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z')]),
  ChevronLeft: (p) => React.createElement(BaseIcon, p, [P('M15 18l-6-6 6-6')]),
  ChevronRight: (p) => React.createElement(BaseIcon, p, [P('M9 18l6-6-6-6')]),
  Clock: (p) => React.createElement(BaseIcon, p, [C(12, 12, 9), P('M12 7v5l3 3')]),
  Plus: (p) => React.createElement(BaseIcon, p, [L(12, 5, 12, 19), L(5, 12, 19, 12)]),
  Bookmark: (p) => React.createElement(BaseIcon, p, [P('M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z')]),
  MessageCircle: (p) => React.createElement(BaseIcon, p, [P('M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.3 0-2.5-.3-3.6-.8L3 21l1.4-5A8.4 8.4 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5 8.5 8.5 0 0 1 21 12Z')]),
  Image: (p) => React.createElement(BaseIcon, p, [RC(3, 3, 18, 18, 2), C(9, 9, 2), P('M21 15l-5-5L5 21')]),
  Tag: (p) => React.createElement(BaseIcon, p, [P('M20.6 12.9 12.9 20.6a2 2 0 0 1-2.8 0l-8.7-8.7a2 2 0 0 1 0-2.8L9.1 1.4 20.6 10a2 2 0 0 1 0 2.9Z'), C(7, 7, 1)]),
  HelpCircle: (p) => React.createElement(BaseIcon, p, [C(12, 12, 9), P('M9.1 9a3 3 0 1 1 3.9 2.9c-.9.3-1.5 1-1.5 2v.6'), L(12, 17, 12, 17.01)]),
  Heart: (p) => React.createElement(BaseIcon, p, [P('M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z')]),
  Share2: (p) => React.createElement(BaseIcon, p, [C(18, 5, 3), C(6, 12, 3), C(18, 19, 3), L(8.6, 13.5, 15.4, 17.5), L(15.4, 6.5, 8.6, 10.5)]),
  BadgeCheck: (p) => React.createElement(BaseIcon, p, [P('M12 2l2.4 1.2 2.6-.4 1.4 2.3 2.3 1.4-.4 2.6L21.5 12l-1.2 2.4.4 2.6-2.3 1.4-1.4 2.3-2.6-.4L12 21.5l-2.4-1.2-2.6.4-1.4-2.3-2.3-1.4.4-2.6L2.5 12l1.2-2.4-.4-2.6 2.3-1.4 1.4-2.3 2.6.4Z'), P('M8.5 12.5l2.3 2.3 4.7-4.8')]),
  FileText: (p) => React.createElement(BaseIcon, p, [P('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z'), P('M14 2v6h6'), L(8, 13, 16, 13), L(8, 17, 16, 17), L(8, 9, 10, 9)]),
  Users: (p) => React.createElement(BaseIcon, p, [P('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'), C(9, 7, 4), P('M23 21v-2a4 4 0 0 0-3-3.9'), P('M16 3.1a4 4 0 0 1 0 7.8')]),
  Lock: (p) => React.createElement(BaseIcon, p, [RC(3, 11, 18, 11, 2), P('M7 11V7a5 5 0 0 1 10 0v4')]),
  Store: (p) => React.createElement(BaseIcon, p, [P('M3 9l1.5-5h15L21 9'), P('M3 9v11h18V9'), P('M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0')]),
  Percent: (p) => React.createElement(BaseIcon, p, [L(19, 5, 5, 19), C(6.5, 6.5, 1.5), C(17.5, 17.5, 1.5)]),
  Zap: (p) => React.createElement(BaseIcon, p, [P('M13 2 3 14h8l-1 8 10-12h-8l1-8Z')]),
  Trophy: (p) => React.createElement(BaseIcon, p, [P('M8 21h8'), P('M12 17v4'), P('M7 4h10v6a5 5 0 0 1-10 0V4Z'), P('M7 5H4a2 2 0 0 0 0 4h3'), P('M17 5h3a2 2 0 0 1 0 4h-3')]),
  Flame: (p) => React.createElement(BaseIcon, p, [P('M12 2s6 5 6 11a6 6 0 0 1-12 0c0-1.5.5-2.7 1.3-3.8.3 1 1 1.8 1.7 1.8 0-3 1-5 3-9Z')]),
  Flag: (p) => React.createElement(BaseIcon, p, [P('M4 3v18'), P('M4 4h13l-2 4 2 4H4Z')]),
  Bell: (p) => React.createElement(BaseIcon, p, [P('M18 8a6 6 0 0 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8Z'), P('M10.3 21a1.9 1.9 0 0 0 3.4 0')]),
  MessageSquare: (p) => React.createElement(BaseIcon, p, [P('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z')]),
  Send: (p) => React.createElement(BaseIcon, p, [P('M22 2 11 13'), P('M22 2 15 22l-4-9-9-4Z')]),
  Check: (p) => React.createElement(BaseIcon, p, [P('M20 6 9 17l-5-5')]),
  ArrowLeft: (p) => React.createElement(BaseIcon, p, [L(19, 12, 5, 12), P('M12 19l-7-7 7-7')]),
  ShieldAlert: (p) => React.createElement(BaseIcon, p, [P('M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5Z'), L(12, 8, 12, 13), L(12, 16, 12, 16.01)]),
  GraduationCap: (p) => React.createElement(BaseIcon, p, [P('M22 10 12 5 2 10l10 5 10-5Z'), P('M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5')]),
  Star: (p) => React.createElement(BaseIcon, p, [P('M12 2l3 6.6L22 10l-5 4.9L18.2 22 12 18.6 5.8 22 7 14.9 2 10l7-1.4Z')]),
  Settings: (p) => React.createElement(BaseIcon, p, [C(12, 12, 3), P('M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z')]),
  UserCircle: (p) => React.createElement(BaseIcon, p, [C(12, 12, 10), C(12, 10, 3), P('M6.2 18.5a6 6 0 0 1 11.6 0')]),
  Video: (p) => React.createElement(BaseIcon, p, [RC(2, 6, 14, 12, 2), P('M23 7l-7 5 7 5V7Z')]),
  Play: (p) => React.createElement(BaseIcon, p, [P('M6 4l14 8-14 8V4Z')]),
};
