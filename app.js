// SMU Campus Hub -- main app component.

const { useState, useMemo } = React;
const {
  Menu, Calendar, MapPin, Search, Sparkles, Building2, Mail, Phone,
  ChevronLeft, ChevronRight, X, Clock, Plus, Bookmark, MessageCircle,
  Image: ImageIcon, Tag, HelpCircle, Heart, Share2, BadgeCheck, FileText,
  Users, Lock, Store, Percent, Zap, Trophy, Flame, Flag, Bell, MessageSquare,
  Send, Check, ArrowLeft, ShieldAlert, GraduationCap, Star,
  Settings: SettingsIcon, UserCircle, Video, Play,
} = Icons;

function ReportButton({ reported, onReport }) {
  const [open, setOpen] = useState(false);
  if (reported) {
    return <span className="flex items-center gap-1 text-[9.5px] font-semibold" style={{ color: '#B5AD9D' }}><Flag size={11} /> Reported</span>;
  }
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}>
        <Flag size={13} color="#C9BFA8" />
      </button>
      {open && (
        <div className="absolute right-0 top-5 z-10 rounded-xl overflow-hidden shadow-lg w-44" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
          <div className="px-3 py-2 text-[10px] font-bold" style={{ color: '#8A8478', background: CREAM }}>Report this post</div>
          {REPORT_REASONS.map(r => (
            <button key={r} onClick={() => { onReport(r); setOpen(false); }} className="w-full text-left px-3 py-2 text-[11.5px]" style={{ color: INK }}>
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VerifiedBadge() {
  return <BadgeCheck size={13} color={INK} fill={`${INK}20`} strokeWidth={2.4} />;
}

function Avatar({ name, color = INK }) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[11px] text-white" style={{ background: color }}>
      {name.charAt(0)}
    </div>
  );
}

function EngagementRow({ likes, liked, onLike, replies, authorName, saved, onBookmark, dark }) {
  const muted = dark ? 'rgba(255,255,255,0.45)' : '#B5AD9D';
  const mutedText = dark ? 'rgba(255,255,255,0.55)' : '#8A8478';
  return (
    <div className="flex items-center justify-between mt-2.5">
      <button onClick={onLike} className="flex items-center gap-1.5">
        <Heart size={15} color={liked ? CORAL : muted} fill={liked ? CORAL : 'none'} strokeWidth={2.2} />
        <span className="text-[11px] font-semibold" style={{ color: liked ? CORAL : mutedText }}>{likes}</span>
      </button>
      {typeof replies === 'number' ? (
        <div className="flex items-center gap-1.5">
          <MessageCircle size={14} color={muted} strokeWidth={2.2} />
          <span className="text-[11px] font-semibold" style={{ color: mutedText }}>{replies}</span>
        </div>
      ) : <div />}
      <MessageButton name={authorName} muted={muted} />
      <button onClick={onBookmark}>
        <Bookmark size={14} fill={saved ? INK : 'none'} color={saved ? INK : muted} strokeWidth={2.2} />
      </button>
      <button>
        <Share2 size={14} color={muted} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function MessageButton({ name, muted = '#B5AD9D' }) {
  const [sent, setSent] = useState(false);
  if (!name || name === 'You') return <div style={{ width: 14 }} />;
  return (
    <button onClick={() => setSent(true)} disabled={sent} title={sent ? 'Message request sent' : 'Send message request'}>
      <Mail size={14} color={sent ? INK : muted} fill={sent ? `${INK}18` : 'none'} strokeWidth={2.2} />
    </button>
  );
}


function MediaBlock({ media, dark }) {
  if (!media) return null;
  if (media.type === 'image') {
    return <img src={media.url} alt="" className="w-full h-44 object-cover rounded-xl mt-2.5" />;
  }
  return (
    <div className="relative w-full h-44 rounded-xl mt-2.5 overflow-hidden">
      <img src={media.url} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
          <Play size={18} color={INK} fill={INK} />
        </div>
      </div>
      <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{media.duration}</span>
    </div>
  );
}

function PostCard({ post, onLike, onReport, onBookmark }) {
  return (
    <div className="rounded-2xl p-3.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={post.name} color={INK} />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[12.5px]" style={{ color: INK }}>{post.name}</span>
              {post.verified && <VerifiedBadge />}
            </div>
            <div className="text-[10px]" style={{ color: '#8A8478' }}>{post.tag}</div>
          </div>
        </div>
        <ReportButton reported={post.reported} onReport={r => onReport(post.id, r)} />
      </div>
      <p className="text-[12.5px] mt-2.5 leading-snug" style={{ color: '#2A2A2A' }}>{post.text}</p>
      <MediaBlock media={post.media} />
      <EngagementRow likes={post.likes} liked={post.liked} onLike={() => onLike(post.id)}
        replies={post.comments} authorName={post.name} saved={post.saved} onBookmark={() => onBookmark(post.id)} />
    </div>
  );
}

function QuestionCard({ post, onLike, onReport, onBookmark }) {
  return (
    <div className="rounded-2xl p-3.5" style={{ background: '#fff', border: '1.5px dashed #D8CBAE' }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={post.name} color={INK} />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[12.5px]" style={{ color: INK }}>{post.name}</span>
              {post.verified && <VerifiedBadge />}
            </div>
            <div className="text-[10px]" style={{ color: '#8A8478' }}>{post.tag}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: post.answered ? `${INK}15` : `${CORAL}18`, color: post.answered ? INK : CORAL }}>
            <HelpCircle size={10} /> {post.answered ? 'Answered' : 'Open'}
          </span>
          <ReportButton reported={post.reported} onReport={r => onReport(post.id, r)} />
        </div>
      </div>
      <p className="text-[12.5px] mt-2.5 leading-snug" style={{ color: '#2A2A2A' }}>{post.text}</p>
      <MediaBlock media={post.media} />
      {post.answered && post.responseMinutes && post.responseMinutes <= 30 && post.likes >= 5 && (
        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-1 rounded-full w-fit" style={{ background: `${INK}12`, color: INK }}>
          <Zap size={11} /> Answered in {post.responseMinutes} min · +15 pts toward Verified Helper
        </div>
      )}
      <EngagementRow likes={post.likes} liked={post.liked} onLike={() => onLike(post.id)}
        replies={post.replies} authorName={post.name} saved={post.saved} onBookmark={() => onBookmark(post.id)} />
    </div>
  );
}

function PaperCard({ post, onLike, onFollow, onReport, onBookmark }) {
  return (
    <div className="rounded-2xl p-3.5 overflow-hidden relative" style={{ background: INK }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <FileText size={13} color="#fff" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-white/70">Postgrad paper</span>
        </div>
        <ReportButton reported={post.reported} onReport={r => onReport(post.id, r)} />
      </div>
      <div className="flex items-center gap-2 mb-2.5">
        <Avatar name={post.name} color={INK} />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[12.5px] text-white">{post.name}</span>
            {post.verified && <BadgeCheck size={13} color="#fff" fill="rgba(255,255,255,0.2)" strokeWidth={2.4} />}
          </div>
          <div className="text-[10px] text-white/50">{post.tag}</div>
        </div>
      </div>
      <h4 className="text-white font-extrabold text-[13.5px] leading-snug">{post.title}</h4>
      <div className="text-[10.5px] text-white/45 mt-1 italic">{post.venue}</div>
      <p className="text-white/70 text-[12px] mt-2 leading-snug">{post.abstract}</p>
      <MediaBlock media={post.media} dark />
      {post.pdf && (
        <div className="flex items-center gap-2 mt-2.5 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <FileText size={14} color="#fff" />
          <span className="flex-1 text-[11.5px] font-semibold text-white truncate">{post.pdf}</span>
          <span className="text-[10px] font-bold text-white/60">PDF</span>
        </div>
      )}
      <div className="flex items-center gap-2 mt-3">
        <button onClick={() => onFollow(post.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
          style={post.following ? { background: 'rgba(255,255,255,0.18)', color: '#fff' } : { background: '#fff', color: INK }}>
          <Users size={12} /> {post.following ? 'Following' : 'Follow'} · {post.followers + (post.following ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
          <Lock size={11} /> Request access
        </button>
      </div>
      <EngagementRow likes={post.likes} liked={post.liked} onLike={() => onLike(post.id)}
        authorName={post.name} saved={post.saved} onBookmark={() => onBookmark(post.id)} dark />
    </div>
  );
}

function Composer({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('post');
  const [text, setText] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [media, setMedia] = useState(null);
  const [pdf, setPdf] = useState(null);

  const addPhoto = () => {
    const url = DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)];
    setMedia({ type: 'image', url });
  };
  const addVideo = () => {
    const v = DUMMY_VIDEO_THUMBS[Math.floor(Math.random() * DUMMY_VIDEO_THUMBS.length)];
    setMedia({ type: 'video', url: v.url, duration: v.duration });
  };
  const addPdf = () => {
    const names = ['research-draft.pdf', 'full-paper.pdf', 'manuscript-v2.pdf'];
    setPdf(names[Math.floor(Math.random() * names.length)]);
  };

  const submit = () => {
    if (mode === 'paper') {
      if (!paperTitle.trim()) return;
      onSubmit({ id: Date.now(), type: 'paper', name: 'You', tag: 'Postgrad', verified: true, date: '2026-09-03', title: paperTitle, venue: 'Shared by you, 2026', abstract: text || 'No abstract added yet.', followers: 0, following: false, likes: 0, liked: false, media, pdf });
    } else if (mode === 'question') {
      if (!text.trim()) return;
      onSubmit({ id: Date.now(), type: 'question', name: 'You', tag: 'Student', verified: false, society: null, date: '2026-09-03', text, replies: 0, answered: false, likes: 0, liked: false, media });
    } else {
      if (!text.trim()) return;
      onSubmit({ id: Date.now(), type: 'post', name: 'You', tag: 'Student', verified: false, date: '2026-09-03', text, likes: 0, liked: false, comments: 0, media });
    }
    setText(''); setPaperTitle(''); setMedia(null); setPdf(null); setOpen(false); setMode('post');
  };

  return (
    <div className="mx-4 mt-3 rounded-2xl p-3.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
      {!open ? (
        <button onClick={() => setOpen(true)} className="w-full flex items-center gap-2.5 text-left">
          <Avatar name="Y" color={INK} />
          <span className="flex-1 text-[12.5px] rounded-full px-3.5 py-2" style={{ background: CREAM, color: '#8A8478' }}>What's on your mind?</span>
        </button>
      ) : (
        <div>
          <div className="flex gap-1.5 mb-2.5">
            {[['post', 'Share'], ['question', 'Ask seniors'], ['paper', 'Share a paper']].map(([id, label]) => (
              <button key={id} onClick={() => setMode(id)} className="px-3 py-1 rounded-full text-[9px] font-bold leading-none"
                style={mode === id ? { background: INK, color: '#fff' } : { background: CREAM, color: '#8A8478' }}>
                {label}
              </button>
            ))}
          </div>
          {mode === 'paper' && (
            <input value={paperTitle} onChange={e => setPaperTitle(e.target.value)} placeholder="Paper title" className="w-full text-[13px] px-3 py-2 rounded-xl outline-none mb-2" style={{ background: CREAM, color: INK }} />
          )}
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
            placeholder={mode === 'paper' ? 'One-line abstract...' : mode === 'question' ? 'Ask seniors or your res something...' : 'What\'s on your mind?'}
            className="w-full text-[13px] px-3 py-2 rounded-xl outline-none resize-none" style={{ background: CREAM, color: INK }} />

          {media && (
            <div className="relative mt-2">
              <MediaBlock media={media} />
              <button onClick={() => setMedia(null)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
                <X size={13} color="#fff" />
              </button>
            </div>
          )}
          {pdf && (
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl" style={{ background: CREAM }}>
              <FileText size={14} color={INK} />
              <span className="flex-1 text-[11.5px] font-semibold truncate" style={{ color: INK }}>{pdf}</span>
              <button onClick={() => setPdf(null)}><X size={13} color="#8A8478" /></button>
            </div>
          )}

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5">
              {mode === 'paper' ? (
                <button onClick={addPdf} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold" style={{ background: CREAM, color: INK }}>
                  <FileText size={12} /> Attach PDF
                </button>
              ) : (
                <>
                  <button onClick={addPhoto} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold" style={{ background: CREAM, color: INK }}>
                    <ImageIcon size={12} /> Photo
                  </button>
                  <button onClick={addVideo} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold" style={{ background: CREAM, color: INK }}>
                    <Video size={12} /> Video
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => { setOpen(false); setText(''); setPaperTitle(''); setMedia(null); setPdf(null); }} className="px-3 py-1.5 rounded-full text-[11.5px] font-bold" style={{ color: '#8A8478' }}>Cancel</button>
              <button onClick={submit} className="px-4 py-1.5 rounded-full text-[11.5px] font-bold text-white" style={{ background: INK }}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardPanel({ onBack }) {
  const nextTier = 150;
  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <span className="font-extrabold text-[14px]" style={{ color: INK }}>Leaderboard</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: `linear-gradient(120deg, ${INK}, #2C4A6E)` }}>
          <div className="flex items-center gap-2 px-4 py-3">
            <Trophy size={16} color="#fff" />
            <span className="text-white font-extrabold text-[12.5px]">This week's top helpers</span>
          </div>
          <p className="text-white/85 text-[10.5px] leading-snug px-4 pb-3">
            Answer a question with 5+ likes within 30 minutes to earn points. Hit 150 to unlock Verified Helper status.
          </p>
        </div>
        <div className="space-y-2.5">
          {HELPERS.map((h, i) => (
            <div key={h.id} className="flex items-center gap-2.5 rounded-2xl p-3" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
              <span className="w-5 text-center font-extrabold text-[13px]" style={{ color: i === 0 ? INK : '#B5AD9D' }}>{i + 1}</span>
              <Avatar name={h.name} color={h.color} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12.5px]" style={{ color: INK }}>{h.name}</span>
                  <span className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: h.color }}>
                    {h.tier === 'Verified Helper' && <Flame size={11} />} {h.points} pts
                  </span>
                </div>
                <div className="h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: '#EEE0CB' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (h.points / nextTier) * 100)}%`, background: h.color }} />
                </div>
                <span className="text-[9.5px]" style={{ color: '#8A8478' }}>{h.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineTab({ posts, onAdd, onLike, onFollow, onReport, onBookmark }) {
  return (
    <div>
      <Composer onSubmit={onAdd} />
      <div className="px-4 pt-3 pb-4 space-y-3">
        {posts.map(post => {
          if (post.type === 'post') return <PostCard key={post.id} post={post} onLike={onLike} onReport={onReport} onBookmark={onBookmark} />;
          if (post.type === 'question') return <QuestionCard key={post.id} post={post} onLike={onLike} onReport={onReport} onBookmark={onBookmark} />;
          if (post.type === 'paper') return <PaperCard key={post.id} post={post} onLike={onLike} onFollow={onFollow} onReport={onReport} onBookmark={onBookmark} />;
          return null;
        })}
      </div>
    </div>
  );
}

function MiniCalendar({ onPick, activeDate }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date(2026, 7, 1 + monthOffset * 31);
  const monthLabel = base.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
  const eventDates = new Set(EVENTS.map(e => e.date));
  const firstDay = new Date(base.getFullYear(), base.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  const cells = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="mx-4 mt-2 rounded-2xl p-4" style={{ background: INK }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setMonthOffset(m => m - 1)} className="text-white/70 p-1"><ChevronLeft size={18} /></button>
        <span className="text-white font-bold text-[13px] capitalize">{monthLabel}</span>
        <button onClick={() => setMonthOffset(m => m + 1)} className="text-white/70 p-1"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-[9px] font-bold text-white/40">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = `2026-${String(base.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const has = eventDates.has(dateStr);
          const isActive = activeDate === dateStr;
          return (
            <button key={i} onClick={() => onPick(dateStr)} className="aspect-square flex flex-col items-center justify-center rounded-lg text-[10.5px] font-semibold"
              style={{
                background: isActive ? INK : has ? `${INK}CC` : 'transparent',
                color: isActive ? INK : has ? 'white' : 'rgba(255,255,255,0.55)',
              }}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EventCard({ ev, onOpen }) {
  const day = new Date(ev.date + 'T00:00:00');
  const dayNum = day.getDate();
  const monthShort = day.toLocaleDateString('en-ZA', { month: 'short' });
  return (
    <button onClick={() => onOpen(ev)} className="w-full text-left rounded-2xl overflow-hidden" style={{ border: '1.5px solid #EEE0CB', background: '#fff' }}>
      <div className="h-28 relative flex items-end p-3" style={{ background: `linear-gradient(135deg, ${ev.color}, ${ev.color}99)` }}>
        <div className="absolute top-2.5 left-2.5 rounded-lg px-2 py-1 text-center leading-none" style={{ background: 'rgba(255,255,255,0.94)' }}>
          <div className="text-[14px] font-extrabold" style={{ color: ev.color }}>{dayNum}</div>
          <div className="text-[8px] font-bold uppercase" style={{ color: ev.color }}>{monthShort}</div>
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.22)' }}>
          <ImageIcon size={10} color="#fff" />
          <span className="text-[9px] font-bold text-white">Poster</span>
        </div>
        <span className="text-white font-extrabold text-[15px] leading-tight drop-shadow-sm">{ev.title}</span>
      </div>
      <div className="p-3">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${ev.color}20`, color: ev.color }}>
          {ev.society}
        </span>
        <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: '#8A8478' }}>
          <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>
          <span className="flex items-center gap-1"><MapPin size={11} />{ev.location}</span>
        </div>
      </div>
    </button>
  );
}

function EventsTab() {
  const [society, setSociety] = useState('All');
  const [dateFilter, setDateFilter] = useState(null);
  const [searchMode, setSearchMode] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return EVENTS
      .filter(e => society === 'All' || e.society === society)
      .filter(e => !dateFilter || e.date === dateFilter);
  }, [society, dateFilter]);

  return (
    <div className="relative">
      <div className="flex gap-2 px-4 pt-3">
        <button onClick={() => setSearchMode(m => (m === 'date' ? null : 'date'))}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold"
          style={searchMode === 'date' ? { background: INK, color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
          <Calendar size={13} /> By date
        </button>
        <button onClick={() => setSearchMode(m => (m === 'society' ? null : 'society'))}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold"
          style={searchMode === 'society' ? { background: INK, color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
          <Tag size={13} /> By structure
        </button>
      </div>

      {(dateFilter || society !== 'All') && (
        <div className="flex gap-2 px-4 pt-2.5 flex-wrap">
          {dateFilter && (
            <span className="flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${INK}15`, color: INK }}>
              {dateFilter} <button onClick={() => setDateFilter(null)}><X size={11} /></button>
            </span>
          )}
          {society !== 'All' && (
            <span className="flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${INK}15`, color: INK }}>
              {society} <button onClick={() => setSociety('All')}><X size={11} /></button>
            </span>
          )}
        </div>
      )}

      {searchMode === 'date' && <MiniCalendar activeDate={dateFilter} onPick={d => { setDateFilter(d); setSearchMode(null); }} />}

      {searchMode === 'society' && (
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {SOCIETIES.map(s => (
            <button key={s} onClick={() => { setSociety(s); setSearchMode(null); }}
              className="shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold whitespace-nowrap"
              style={s === society ? { background: INK, color: 'white' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-3">
        {filtered.map(ev => <EventCard key={ev.id} ev={ev} onOpen={setSelected} />)}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No events match that filter yet.</div>
        )}
      </div>

      {selected && (
        <div className="absolute inset-0 z-20 flex items-end" style={{ background: 'rgba(18,42,69,0.5)' }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full rounded-t-3xl p-5" style={{ background: CREAM }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${selected.color}20`, color: selected.color }}>
                {selected.society}
              </span>
              <button onClick={() => setSelected(null)}><X size={18} color={INK} /></button>
            </div>
            <h3 className="font-extrabold text-[17px]" style={{ color: INK }}>{selected.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-[12px]" style={{ color: '#8A8478' }}>
              <span className="flex items-center gap-1"><Calendar size={12} />{selected.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{selected.time}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[12px]" style={{ color: '#8A8478' }}>
              <MapPin size={12} />{selected.location}
            </div>
            <p className="text-[13px] mt-3 leading-snug" style={{ color: INK }}>{selected.desc}</p>
            <button className="w-full mt-4 py-2.5 rounded-xl font-bold text-[13px] text-white" style={{ background: selected.color }}>
              Add to my calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BusinessComposer({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState(CATEGORIES[1]);
  const [desc, setDesc] = useState('');
  const [contact, setContact] = useState('');
  const [residence, setResidence] = useState('All residences');

  const submit = () => {
    if (!name.trim() || !desc.trim()) return;
    onSubmit({ id: Date.now(), name, type, category: category || 'Student business', desc, contact: contact || 'Contact via inbox', location: 'Near campus', residence, promo: null, color: INK });
    setName(''); setCategory(''); setType(CATEGORIES[1]); setDesc(''); setContact(''); setResidence('All residences'); setOpen(false);
  };

  return (
    <div className="mx-4 mt-3 rounded-2xl p-3.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
      {!open ? (
        <button onClick={() => setOpen(true)} className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[12.5px] font-bold" style={{ color: INK }}>
          <Plus size={15} /> List your business
        </button>
      ) : (
        <div className="space-y-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Business name" className="w-full text-[13px] px-3 py-2 rounded-xl outline-none" style={{ background: CREAM, color: INK }} />
          <select value={type} onChange={e => setType(e.target.value)} className="w-full text-[13px] px-3 py-2 rounded-xl outline-none" style={{ background: CREAM, color: INK }}>
            {CATEGORIES.filter(c => c !== 'All categories').map(c => <option key={c}>{c}</option>)}
          </select>
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Short tagline (e.g. Home-cooked meals)" className="w-full text-[13px] px-3 py-2 rounded-xl outline-none" style={{ background: CREAM, color: INK }} />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="What do you offer students?" className="w-full text-[13px] px-3 py-2 rounded-xl outline-none resize-none" style={{ background: CREAM, color: INK }} />
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact number or email" className="w-full text-[13px] px-3 py-2 rounded-xl outline-none" style={{ background: CREAM, color: INK }} />
          <select value={residence} onChange={e => setResidence(e.target.value)} className="w-full text-[13px] px-3 py-2 rounded-xl outline-none" style={{ background: CREAM, color: INK }}>
            {RESIDENCES.map(r => <option key={r}>{r}</option>)}
          </select>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-full text-[11.5px] font-bold" style={{ color: '#8A8478' }}>Cancel</button>
            <button onClick={submit} className="px-4 py-1.5 rounded-full text-[11.5px] font-bold text-white" style={{ background: INK }}>List business</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BusinessesTab() {
  const [businesses, setBusinesses] = useState(BUSINESSES);
  const [query, setQuery] = useState('');
  const [residence, setResidence] = useState('All residences');
  const [category, setCategory] = useState('All categories');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses
      .filter(b => residence === 'All residences' || b.residence === residence || b.residence === 'All residences')
      .filter(b => category === 'All categories' || b.type === category)
      .filter(b => !q || `${b.name} ${b.category} ${b.desc}`.toLowerCase().includes(q));
  }, [businesses, query, residence, category]);

  return (
    <div className="px-4 pt-4 pb-4">
      <div className="rounded-2xl p-4 mb-1" style={{ background: `linear-gradient(135deg, ${INK}, #2C4A6E)` }}>
        <div className="flex items-center gap-1.5 mb-1">
          <Store size={14} color="#fff" />
          <span className="text-white font-extrabold text-[13px]">Student Businesses</span>
        </div>
        <p className="text-white/70 text-[11px] leading-snug">Kept separate from the timeline so ads and promos never crowd out student posts.</p>
      </div>

      <div className="flex items-center gap-2 mt-3 rounded-xl px-3 py-2.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
        <Search size={15} color="#8A8478" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search businesses..."
          className="flex-1 text-[13px] outline-none bg-transparent"
          style={{ color: INK }}
        />
        {query && <button onClick={() => setQuery('')}><X size={14} color="#8A8478" /></button>}
      </div>

      <div className="flex gap-2 pt-3 overflow-x-auto no-scrollbar">
        {RESIDENCES.map(r => (
          <button key={r} onClick={() => setResidence(r)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold whitespace-nowrap"
            style={r === residence ? { background: INK, color: 'white' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
            {r}
          </button>
        ))}
      </div>

      <div className="flex gap-2 pt-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold whitespace-nowrap"
            style={c === category ? { background: '#2C4A6E', color: 'white' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
            {c}
          </button>
        ))}
      </div>

      <BusinessComposer onSubmit={b => setBusinesses(prev => [b, ...prev])} />

      <div className="space-y-2.5 mt-3">
        {filtered.map(b => (
          <div key={b.id} className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
            <div className="h-1.5" style={{ background: b.color }} />
            <div className="p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-[13px]" style={{ color: INK }}>{b.name}</span>
                  <div className="text-[10.5px] mt-0.5" style={{ color: '#8A8478' }}>{b.category}</div>
                </div>
                {b.promo && (
                  <span className="flex items-center gap-1 text-[9.5px] font-bold px-2 py-1 rounded-full shrink-0" style={{ background: `${INK}12`, color: INK }}>
                    <Percent size={10} /> {b.promo}
                  </span>
                )}
              </div>
              <span className="inline-block mt-1.5 text-[9.5px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#F1F3F5', color: INK }}>{b.residence}</span>
              <p className="text-[12px] mt-2 leading-snug" style={{ color: '#2A2A2A' }}>{b.desc}</p>
              <div className="flex flex-col gap-1 mt-2.5">
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#8A8478' }}>
                  <MapPin size={11} /> {b.location}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: INK }}>
                  <Phone size={11} /> {b.contact}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No businesses match that search.</div>
        )}
      </div>
    </div>
  );
}

const WISDOM_PASTELS = [
  { bg: '#F5EEFC', accent: '#8B6FC9' },
  { bg: '#FFF1E8', accent: '#E0904F' },
  { bg: '#EAF7F1', accent: '#3FA37A' },
  { bg: '#EAF2FC', accent: '#5B8DEF' },
];

function WisdomTab() {
  const [saved, setSaved] = useState({});
  const [query, setQuery] = useState('');
  const [faculty, setFaculty] = useState('All faculties');
  const [stream, setStream] = useState('All streams');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WISDOM
      .filter(w => faculty === 'All faculties' || w.faculty === faculty)
      .filter(w => stream === 'All streams' || w.stream === stream)
      .filter(w => !q || `${w.name} ${w.tag} ${w.text}`.toLowerCase().includes(q));
  }, [query, faculty, stream]);

  return (
    <div className="px-4 pt-4 pb-4" style={{ background: '#FBF8FF', minHeight: '100%' }}>
      <div className="rounded-2xl p-4 mb-3" style={{ background: 'linear-gradient(135deg, #F5EEFC, #EAF2FC)', border: '1.5px solid #EDE4FA' }}>
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles size={14} color="#8B6FC9" />
          <span className="font-extrabold text-[13px]" style={{ color: INK }}>Wisdom Wall</span>
        </div>
        <p className="text-[11px] leading-snug" style={{ color: '#6B6478' }}>Real advice from students who've been there, dropped by seniors and postgrads for everyone coming up behind them.</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2.5" style={{ background: '#fff', border: '1.5px solid #EDE4FA' }}>
        <Search size={15} color="#8A8478" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search wisdom..."
          className="flex-1 text-[13px] outline-none bg-transparent"
          style={{ color: INK }}
        />
        {query && <button onClick={() => setQuery('')}><X size={14} color="#8A8478" /></button>}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5">
        {FACULTIES.map(f => (
          <button key={f} onClick={() => setFaculty(f)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={f === faculty ? { background: '#8B6FC9', color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EDE4FA' }}>
            {f}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2 mb-3">
        {STREAMS.map(s => (
          <button key={s} onClick={() => setStream(s)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={s === stream ? { background: '#5B8DEF', color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EDE4FA' }}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((w, i) => {
          const pastel = WISDOM_PASTELS[i % WISDOM_PASTELS.length];
          return (
            <div key={w.id} className="rounded-2xl p-3.5" style={{ background: '#fff', border: `1.5px solid ${pastel.bg}`, borderLeft: `4px solid ${pastel.accent}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-[13px]" style={{ color: INK }}>{w.name}</span>
                  <div className="text-[10.5px]" style={{ color: '#8A8478' }}>{w.tag}</div>
                </div>
                <button onClick={() => setSaved(s => ({ ...s, [w.id]: !s[w.id] }))}>
                  <Bookmark size={16} fill={saved[w.id] ? pastel.accent : 'none'} color={saved[w.id] ? pastel.accent : '#C9BFA8'} />
                </button>
              </div>
              <p className="text-[13px] mt-2 leading-snug" style={{ color: '#2A2A2A' }}>{w.text}</p>
              <div className="text-[10.5px] mt-2 font-semibold" style={{ color: pastel.accent }}>
                {w.saves + (saved[w.id] ? 1 : 0)} students saved this
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No wisdom matches that filter yet.</div>
        )}
      </div>
      <button className="w-full mt-3 py-3 rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5" style={{ background: '#fff', color: INK, border: '1.5px solid #EDE4FA' }}>
        <Plus size={15} /> Leave your own wisdom
      </button>
    </div>
  );
}

function DirectoryTab() {
  const [query, setQuery] = useState('');
  const filtered = DIRECTORY.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="px-4 pt-4 pb-4">
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
        <Search size={15} color="#8A8478" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search offices..."
          className="flex-1 text-[13px] outline-none bg-transparent"
          style={{ color: INK }}
        />
      </div>
      <div className="space-y-2.5">
        {filtered.map(d => (
          <div key={d.id} className="rounded-2xl p-3.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${INK}12` }}>
                <Building2 size={16} color={INK} />
              </div>
              <div className="flex-1">
                <span className="font-bold text-[13px]" style={{ color: INK }}>{d.name}</span>
                <div className="text-[11px] mt-0.5" style={{ color: '#8A8478' }}>{d.building}</div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: INK }}>
                    <Mail size={12} /> {d.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: INK }}>
                    <Phone size={12} /> {d.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No offices match that search.</div>
        )}
      </div>
    </div>
  );
}

function FeedbackPanel({ onBack }) {
  const [category, setCategory] = useState('Bug / something broken');
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <span className="font-extrabold text-[14px]" style={{ color: INK }}>Feedback</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {sent ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: `${INK}12` }}>
              <Check size={20} color={INK} />
            </div>
            <p className="font-bold text-[13px]" style={{ color: INK }}>Thanks, we've got it.</p>
            <p className="text-[11.5px] mt-1" style={{ color: '#8A8478' }}>We read every submission and use it to fix and improve SMU Campus Hub.</p>
          </div>
        ) : (
          <>
            <p className="text-[11.5px] leading-snug mb-3" style={{ color: '#8A8478' }}>Spot a bug, a broken feature, or something that could work better? Tell us here.</p>
            <div className="space-y-2 mb-3">
              {['Bug / something broken', 'Feature request', 'Content concern', 'Other'].map(c => (
                <button key={c} onClick={() => setCategory(c)} className="w-full text-left px-3.5 py-2.5 rounded-xl text-[12.5px] font-semibold"
                  style={category === c ? { background: INK, color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
                  {c}
                </button>
              ))}
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={5} placeholder="Describe what happened..." className="w-full text-[13px] px-3.5 py-2.5 rounded-xl outline-none resize-none" style={{ background: '#fff', border: '1.5px solid #EEE0CB', color: INK }} />
            <button onClick={() => text.trim() && setSent(true)} className="w-full mt-3 py-3 rounded-xl font-bold text-[13px] text-white" style={{ background: INK }}>
              Send feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SearchPage({ onBack, allPosts }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const q = query.trim().toLowerCase();

  const people = useMemo(() => {
    if (!q) return [];
    return PEOPLE.filter(p => p.name.toLowerCase().includes(q) || p.studentNumber.includes(q) || p.tag.toLowerCase().includes(q));
  }, [q]);

  const posts = useMemo(() => {
    if (!q) return [];
    return allPosts.filter(p => (p.type === 'post' || p.type === 'question') && `${p.name} ${p.text}`.toLowerCase().includes(q));
  }, [q, allPosts]);

  const papers = useMemo(() => {
    if (!q) return [];
    return allPosts.filter(p => p.type === 'paper' && `${p.name} ${p.title} ${p.abstract}`.toLowerCase().includes(q));
  }, [q, allPosts]);

  const showPeople = filter === 'all' || filter === 'people';
  const showPosts = filter === 'all' || filter === 'posts';
  const showPapers = filter === 'all' || filter === 'papers';
  const noResults = q && people.length === 0 && posts.length === 0 && papers.length === 0;

  return (
    <div className="h-full flex flex-col" style={{ background: '#fff' }}>
      <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: '1.5px solid #ECEEF1' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <div className="flex-1 flex items-center gap-2 rounded-full px-3.5 py-2" style={{ background: '#F1F3F5' }}>
          <Search size={15} color="#7A8290" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, student number, post, or paper"
            className="flex-1 text-[13px] outline-none bg-transparent"
            style={{ color: INK }}
          />
          {query && <button onClick={() => setQuery('')}><X size={14} color="#7A8290" /></button>}
        </div>
      </div>

      <div className="flex gap-5 px-4 pt-1" style={{ borderBottom: '1.5px solid #ECEEF1' }}>
        {[['all', 'All'], ['people', 'People'], ['posts', 'Posts'], ['papers', 'Papers']].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className="pb-2.5 pt-2 text-[12.5px] font-bold relative" style={{ color: filter === id ? INK : '#9AA1AC' }}>
            {label}
            {filter === id && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full" style={{ background: INK }} />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!q && (
          <p className="text-[12px] text-center py-10" style={{ color: '#9AA1AC' }}>Search for a student by name or number, or find posts and papers.</p>
        )}
        {noResults && (
          <p className="text-[12px] text-center py-10" style={{ color: '#9AA1AC' }}>No results for "{query}".</p>
        )}

        {showPeople && people.length > 0 && (
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide mb-2" style={{ color: '#9AA1AC' }}>People</p>
            <div className="space-y-2">
              {people.map(p => (
                <div key={p.id} className="flex items-center gap-2.5 rounded-2xl p-3" style={{ background: '#F7F8FA' }}>
                  <Avatar name={p.name} color={p.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[12.5px]" style={{ color: INK }}>{p.name}</span>
                      {p.verified && <VerifiedBadge />}
                    </div>
                    <div className="text-[10.5px]" style={{ color: '#8A8478' }}>{p.tag} · #{p.studentNumber}</div>
                  </div>
                  <MessageButton name={p.name} />
                </div>
              ))}
            </div>
          </div>
        )}

        {showPosts && posts.length > 0 && (
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide mb-2" style={{ color: '#9AA1AC' }}>Posts</p>
            <div className="space-y-2">
              {posts.map(p => (
                <div key={p.id} className="rounded-2xl p-3" style={{ background: '#F7F8FA' }}>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[12px]" style={{ color: INK }}>{p.name}</span>
                    {p.verified && <VerifiedBadge />}
                  </div>
                  <p className="text-[12px] mt-1 leading-snug" style={{ color: '#3A3A3A' }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showPapers && papers.length > 0 && (
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide mb-2" style={{ color: '#9AA1AC' }}>Papers</p>
            <div className="space-y-2">
              {papers.map(p => (
                <div key={p.id} className="rounded-2xl p-3" style={{ background: INK }}>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[12px] text-white">{p.name}</span>
                    {p.verified && <BadgeCheck size={12} color="#fff" fill="rgba(255,255,255,0.2)" />}
                  </div>
                  <p className="text-white font-semibold text-[12.5px] mt-1 leading-snug">{p.title}</p>
                  <p className="text-white/60 text-[11px] mt-0.5">{p.abstract}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfilePanel({ onBack, myPosts, onLike, onFollow, onReport, onBookmark }) {
  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <span className="font-extrabold text-[14px]" style={{ color: INK }}>Profile</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl p-4 flex flex-col items-center text-center" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-[22px] text-white" style={{ background: INK }}>Y</div>
          <div className="flex items-center gap-1 mt-2.5">
            <span className="font-extrabold text-[15px]" style={{ color: INK }}>You</span>
          </div>
          <span className="text-[11.5px]" style={{ color: '#8A8478' }}>Student · SMU</span>
          <div className="flex gap-4 mt-3.5">
            <div className="text-center">
              <div className="font-extrabold text-[14px]" style={{ color: INK }}>0</div>
              <div className="text-[9.5px]" style={{ color: '#8A8478' }}>Points</div>
            </div>
            <div className="text-center">
              <div className="font-extrabold text-[14px]" style={{ color: INK }}>{myPosts.length}</div>
              <div className="text-[9.5px]" style={{ color: '#8A8478' }}>Posts</div>
            </div>
            <div className="text-center">
              <div className="font-extrabold text-[14px]" style={{ color: INK }}>2</div>
              <div className="text-[9.5px]" style={{ color: '#8A8478' }}>Following</div>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl font-bold text-[12.5px]" style={{ background: CREAM, color: INK, border: '1.5px solid #EEE0CB' }}>
            Edit profile
          </button>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-wide mt-5 mb-2" style={{ color: '#8A8478' }}>Your posts</p>
        <div className="space-y-3">
          {myPosts.length === 0 && (
            <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>You haven't posted anything yet. Anything you share on the Timeline shows up here.</div>
          )}
          {myPosts.map(post => {
            if (post.type === 'post') return <PostCard key={post.id} post={post} onLike={onLike} onReport={onReport} onBookmark={onBookmark} />;
            if (post.type === 'question') return <QuestionCard key={post.id} post={post} onLike={onLike} onReport={onReport} onBookmark={onBookmark} />;
            if (post.type === 'paper') return <PaperCard key={post.id} post={post} onLike={onLike} onFollow={onFollow} onReport={onReport} onBookmark={onBookmark} />;
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ onBack }) {
  const [prefs, setPrefs] = useState(Object.fromEntries(SOCIETIES.filter(s => s !== 'All').map(s => [s, true])));
  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <span className="font-extrabold text-[14px]" style={{ color: INK }}>Settings</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: '#8A8478' }}>Notifications</p>
        <div className="rounded-2xl p-3.5 mb-4" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert size={15} color={INK} />
              <span className="font-bold text-[12.5px]" style={{ color: INK }}>Department announcements</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#EEE0CB', color: '#8A8478' }}>
              <Lock size={10} /> Required
            </div>
          </div>
          <p className="text-[11px] mt-1.5 leading-snug" style={{ color: '#8A8478' }}>
            Official announcements from SMU departments (Housing, Financial Aid, Student Affairs, Security etc.) always reach every student, so this can't be turned off.
          </p>
        </div>

        <p className="text-[11px] mb-3 leading-snug" style={{ color: '#8A8478' }}>Choose which structures can notify you about their events and posts.</p>
        <div className="space-y-2 mb-5">
          {SOCIETIES.filter(s => s !== 'All').map(s => (
            <div key={s} className="flex items-center justify-between rounded-xl px-3.5 py-2.5" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
              <span className="text-[12.5px] font-semibold" style={{ color: INK }}>{s}</span>
              <button onClick={() => setPrefs(p => ({ ...p, [s]: !p[s] }))} className="rounded-full relative transition-colors" style={{ background: prefs[s] ? INK : '#EEE0CB', height: 22, width: 40 }}>
                <div className="absolute top-0.5 rounded-full bg-white transition-all" style={{ width: 18, height: 18, left: prefs[s] ? 20 : 2 }} />
              </button>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: '#8A8478' }}>Account</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
          <button className="w-full text-left px-3.5 py-3 text-[12.5px] font-semibold" style={{ color: INK }}>Change password</button>
          <button className="w-full text-left px-3.5 py-3 text-[12.5px] font-semibold" style={{ color: CORAL, borderTop: '1px solid #F2ECDD' }}>Log out</button>
        </div>
      </div>
    </div>
  );
}

function MessagesPanel({ onBack }) {
  const [subTab, setSubTab] = useState('chats');
  const [composing, setComposing] = useState(false);
  const [query, setQuery] = useState('');
  const [requests, setRequests] = useState([
    { id: 1, name: 'Zanele K.', tag: '2nd yr · BSc' },
    { id: 2, name: 'Kabelo M.', tag: 'Honours · Microbiology' },
  ]);
  const [chats, setChats] = useState([
    { id: 1, name: 'Amahle D.', tag: '3rd yr · Pharmacy', last: 'Yeah the Steve Biko placement was solid, I can send you the contact' },
    { id: 2, name: 'Kagiso T.', tag: 'Postgrad · Public Health', last: 'Sure, following you back. Good luck with the research day poster' },
  ]);

  const respond = (id, accept) => {
    if (accept) {
      const r = requests.find(x => x.id === id);
      if (r) setChats(prev => [{ id: Date.now(), name: r.name, tag: r.tag, last: 'Say hi and start the conversation.' }, ...prev]);
    }
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const startChat = (person) => {
    if (!chats.some(c => c.name === person.name)) {
      setChats(prev => [{ id: Date.now(), name: person.name, tag: person.tag, last: 'Say hi and start the conversation.' }, ...prev]);
    }
    setComposing(false);
    setQuery('');
    setSubTab('chats');
  };

  const peopleResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PEOPLE.filter(p => !q || p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
  }, [query]);

  if (composing) {
    return (
      <div className="h-full flex flex-col" style={{ background: CREAM }}>
        <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
          <button onClick={() => { setComposing(false); setQuery(''); }}><ArrowLeft size={18} color={INK} /></button>
          <span className="font-extrabold text-[14px]" style={{ color: INK }}>New message</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
            <Search size={15} color="#8A8478" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search students..."
              className="flex-1 text-[13px] outline-none bg-transparent"
              style={{ color: INK }}
            />
          </div>
          <div className="space-y-2">
            {peopleResults.map(p => (
              <button key={p.id} onClick={() => startChat(p)} className="w-full flex items-center gap-2.5 rounded-2xl p-3 text-left" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
                <Avatar name={p.name} color={INK} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[12.5px]" style={{ color: INK }}>{p.name}</span>
                    {p.verified && <VerifiedBadge />}
                  </div>
                  <p className="text-[10.5px]" style={{ color: '#8A8478' }}>{p.tag}</p>
                </div>
              </button>
            ))}
            {peopleResults.length === 0 && <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No students match that search.</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ background: '#fff', borderBottom: '1.5px solid #EEE0CB' }}>
        <button onClick={onBack}><ArrowLeft size={18} color={INK} /></button>
        <span className="flex-1 font-extrabold text-[14px]" style={{ color: INK }}>Messages</span>
        <button onClick={() => setComposing(true)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${INK}12` }}>
          <Plus size={16} color={INK} />
        </button>
      </div>
      <div className="flex gap-2 px-4 pt-3">
        <button onClick={() => setSubTab('chats')} className="flex-1 py-2 rounded-xl text-[12px] font-bold" style={subTab === 'chats' ? { background: INK, color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>Chats</button>
        <button onClick={() => setSubTab('requests')} className="flex-1 py-2 rounded-xl text-[12px] font-bold relative" style={subTab === 'requests' ? { background: INK, color: '#fff' } : { background: '#fff', color: INK, border: '1.5px solid #EEE0CB' }}>
          Requests {requests.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px]" style={{ background: CORAL, color: '#fff' }}>{requests.length}</span>}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {subTab === 'chats' && (
          <>
            <button onClick={() => setComposing(true)} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold" style={{ background: '#fff', color: INK, border: '1.5px dashed #D8CBAE' }}>
              <Plus size={14} /> Start a new message
            </button>
            {chats.map(c => (
              <div key={c.id} className="flex items-center gap-2.5 rounded-2xl p-3" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
                <Avatar name={c.name} color={INK} />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[12.5px]" style={{ color: INK }}>{c.name}</span>
                  <p className="text-[11px] truncate" style={{ color: '#8A8478' }}>{c.last}</p>
                </div>
              </div>
            ))}
          </>
        )}
        {subTab === 'requests' && (
          <>
            <p className="text-[11px] leading-snug mb-1" style={{ color: '#8A8478' }}>Just like LinkedIn, you decide who gets to message you. Accept to start chatting, or decline.</p>
            {requests.map(r => (
              <div key={r.id} className="flex items-center gap-2.5 rounded-2xl p-3" style={{ background: '#fff', border: '1.5px solid #EEE0CB' }}>
                <Avatar name={r.name} color={INK} />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[12.5px]" style={{ color: INK }}>{r.name}</span>
                  <p className="text-[10.5px]" style={{ color: '#8A8478' }}>{r.tag}</p>
                </div>
                <button onClick={() => respond(r.id, true)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${TEAL}20` }}><Check size={14} color={TEAL} /></button>
                <button onClick={() => respond(r.id, false)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${CORAL}20` }}><X size={14} color={CORAL} /></button>
              </div>
            ))}
            {requests.length === 0 && <div className="text-center text-[12px] py-8" style={{ color: '#8A8478' }}>No pending requests.</div>}
          </>
        )}
      </div>
    </div>
  );
}

function Logo({ size = 36 }) {
  return <div className="shrink-0 rounded-full" style={{ width: size, height: size, background: ORANGE }} />;
}

function SplashLogo() {
  return <img src={LOGO_IMG} alt="SMU Campus Hub" style={{ width: 'min(82vw, 340px)', height: 'auto', objectFit: 'contain' }} />;
}

function SplashScreen({ onDone }) {
  const [ready, setReady] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="h-full flex flex-col items-center justify-center px-6" style={{ background: '#fff' }}>
      <SplashLogo />
      <span className="mt-4 text-[12px] font-extrabold tracking-[0.25em]" style={{ color: INK }}>DEMO</span>
      <button onClick={onDone} className="mt-8 text-[11.5px] font-semibold" style={{ color: ready ? INK : 'transparent', pointerEvents: ready ? 'auto' : 'none' }}>
        Tap to continue
      </button>
    </div>
  );
}

function SMUCampusHub() {
  const [phase, setPhase] = useState('splash');
  const [tab, setTab] = useState('timeline');
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const [posts, setPosts] = useState(TIMELINE_POSTS);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const contentRef = React.useRef(null);
  const touchStartY = React.useRef(null);
  const pulling = React.useRef(false);

  const addPost = p => setPosts(prev => [p, ...prev]);
  const likePost = id => setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p));
  const followPaper = id => setPosts(prev => prev.map(p => p.id === id ? { ...p, following: !p.following } : p));
  const reportPost = (id, reason) => setPosts(prev => prev.map(p => p.id === id ? { ...p, reported: true, reportReason: reason } : p));
  const bookmarkPost = id => setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  const myPosts = useMemo(() => posts.filter(p => p.name === 'You'), [posts]);

  React.useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [tab, panel]);

  const goTop = () => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const onTabClick = (id) => {
    if (id === tab && !panel) {
      goTop();
    } else {
      setPanel(null);
      setTab(id);
    }
  };

  const onTouchStart = (e) => {
    if (tab !== 'timeline' || panel || contentRef.current.scrollTop > 0) { touchStartY.current = null; return; }
    touchStartY.current = e.touches[0].clientY;
    pulling.current = true;
  };
  const onTouchMove = (e) => {
    if (!pulling.current || touchStartY.current == null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setPullY(Math.min(delta * 0.5, 70));
  };
  const onTouchEnd = () => {
    if (!pulling.current) return;
    pulling.current = false;
    if (pullY > 45) {
      setRefreshing(true);
      setPullY(40);
      setTimeout(() => {
        setPosts(TIMELINE_POSTS.map(p => ({ ...p })));
        setRefreshing(false);
        setPullY(0);
      }, 700);
    } else {
      setPullY(0);
    }
    touchStartY.current = null;
  };

  const TABS = [
    { id: 'timeline', label: 'Timeline', icon: Sparkles },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'business', label: 'Business', icon: Store },
    { id: 'wisdom', label: 'Wisdom', icon: Bookmark },
    { id: 'directory', label: 'Directory', icon: Building2 },
  ];

  return (
    <div style={{ background: '#EDEDEF', fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }} className="h-screen w-full flex items-center justify-center sm:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        html, body, #root { height: 100%; }
      `}</style>
      <div className="w-full h-full sm:max-w-sm sm:h-[860px] sm:rounded-[2rem] sm:border sm:shadow-2xl overflow-hidden relative flex flex-col" style={{ borderColor: '#E2E4E8', background: CREAM }}>
        <div style={{ background: INK }} className="hidden sm:flex h-7 items-center justify-center shrink-0">
          <div className="w-16 h-1.5 rounded-full bg-white/20" />
        </div>

        {phase === 'splash' && (
          <div className="flex-1 min-h-0">
            <SplashScreen onDone={() => { setPhase('app'); setTab('timeline'); }} />
          </div>
        )}

        {phase === 'app' && (
        <>
        <div style={{ background: '#fff', borderBottom: '1px solid #ECEEF1' }} className="px-5 pt-3 pb-3 flex items-center justify-between relative shrink-0">
          <button onClick={() => setMenuOpen(o => !o)} className="p-1 -ml-1"><Menu size={22} color={INK} strokeWidth={2} /></button>
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <span style={{ color: INK }} className="font-bold text-[15.5px] tracking-tight">SMU Campus Hub</span>
          </div>
          <button onClick={() => { setMenuOpen(false); setPanel('search'); }} className="p-1 -mr-1"><Search size={19} color={INK} strokeWidth={2} /></button>

          {menuOpen && (
            <div className="absolute top-12 left-3 z-30 rounded-2xl overflow-hidden shadow-xl w-48" style={{ background: '#fff', border: '1px solid #E7E9ED' }}>
              <button onClick={() => { setPanel('profile'); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium" style={{ color: INK }}>
                <UserCircle size={16} color={INK} /> Profile
              </button>
              <button onClick={() => { setPanel('messages'); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium" style={{ color: INK, borderTop: '1px solid #F0F1F3' }}>
                <MessageSquare size={16} color={INK} /> Messages
              </button>
              <button onClick={() => { setPanel('leaderboard'); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium" style={{ color: INK, borderTop: '1px solid #F0F1F3' }}>
                <Trophy size={16} color={INK} /> Leaderboard
              </button>
              <button onClick={() => { setPanel('settings'); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium" style={{ color: INK, borderTop: '1px solid #F0F1F3' }}>
                <SettingsIcon size={16} color={INK} /> Settings
              </button>
              <button onClick={() => { setPanel('feedback'); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium" style={{ color: INK, borderTop: '1px solid #F0F1F3' }}>
                <Flag size={16} color={INK} /> Feedback
              </button>
            </div>
          )}
        </div>

        <div
          ref={contentRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="flex-1 min-h-0 overflow-y-auto relative"
        >
          {tab === 'timeline' && !panel && (pullY > 0 || refreshing) && (
            <div className="flex items-center justify-center overflow-hidden" style={{ height: pullY }}>
              <div className="rounded-full flex items-center justify-center" style={{ width: 26, height: 26, background: '#fff', border: '1.5px solid #EEE0CB' }}>
                <div className={refreshing ? 'animate-spin' : ''} style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid ${INK}`, borderTopColor: 'transparent', opacity: refreshing ? 1 : Math.min(pullY / 45, 1) }} />
              </div>
            </div>
          )}
          {panel === 'search' && <SearchPage onBack={() => setPanel(null)} allPosts={posts} />}
          {panel === 'profile' && <ProfilePanel onBack={() => setPanel(null)} myPosts={myPosts} onLike={likePost} onFollow={followPaper} onReport={reportPost} onBookmark={bookmarkPost} />}
          {panel === 'messages' && <MessagesPanel onBack={() => setPanel(null)} />}
          {panel === 'leaderboard' && <LeaderboardPanel onBack={() => setPanel(null)} />}
          {panel === 'settings' && <SettingsPanel onBack={() => setPanel(null)} />}
          {panel === 'feedback' && <FeedbackPanel onBack={() => setPanel(null)} />}
          {!panel && tab === 'timeline' && <TimelineTab posts={posts} onAdd={addPost} onLike={likePost} onFollow={followPaper} onReport={reportPost} onBookmark={bookmarkPost} />}
          {!panel && tab === 'events' && <EventsTab />}
          {!panel && tab === 'business' && <BusinessesTab />}
          {!panel && tab === 'wisdom' && <WisdomTab />}
          {!panel && tab === 'directory' && <DirectoryTab />}
        </div>

        <div style={{ background: '#fff', borderTop: '1.5px solid #EEE0CB' }} className="shrink-0 flex items-center justify-around py-2" >
              {TABS.map(t => {
                const Icon = t.icon;
                const active = tab === t.id && !panel;
                return (
                  <button key={t.id} onClick={() => onTabClick(t.id)} className="flex flex-col items-center justify-center gap-0.5 px-1">
                    <Icon size={20} color={active ? INK : '#B5AD9D'} strokeWidth={active ? 2.4 : 2} />
                    <span className="text-[8px] font-semibold leading-none whitespace-nowrap" style={{ color: active ? INK : '#B5AD9D' }}>{t.label}</span>
                  </button>
                );
              })}
        </div>
        </>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SMUCampusHub />);
