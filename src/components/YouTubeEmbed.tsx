import './YouTubeEmbed.css';

interface YouTubeEmbedProps {
  url: string;
  title: string;
}

/**
 * Extract YouTube video ID from various URL formats.
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // youtube.com/watch?v=ID
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v');
    }

    // youtu.be/ID
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1) || null;
    }

    // youtube.com/embed/ID
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1] || null;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export default function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <div className="youtube-embed__fallback">
        <a href={url} target="_blank" rel="noopener noreferrer" className="youtube-embed__link">
          Open video on YouTube
        </a>
      </div>
    );
  }

  // Use youtube-nocookie.com for privacy (no tracking cookies) — research.md R7
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="youtube-embed">
      <div className="youtube-embed__container">
        <iframe
          className="youtube-embed__iframe"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <a
        className="youtube-embed__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open on YouTube
      </a>
    </div>
  );
}
