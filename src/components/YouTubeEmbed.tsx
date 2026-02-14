import { useTranslation } from '../i18n';
import './YouTubeEmbed.css';

interface YouTubeEmbedProps {
  url: string;
  title: string;
}

function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v');
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1] || null;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export default function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  const { t } = useTranslation();
  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <div className="youtube-embed__fallback">
        <a href={url} target="_blank" rel="noopener noreferrer" className="youtube-embed__link">
          {t('youtube.openFallback')}
        </a>
      </div>
    );
  }

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
        {t('youtube.openOnYouTube')}
      </a>
    </div>
  );
}
