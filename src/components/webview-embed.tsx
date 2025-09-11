'use client';

interface WebViewEmbedProps {
  url: string;
}

export function WebViewEmbed({ url }: WebViewEmbedProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border">
       <iframe
        src={url}
        title="Firebase Studio Live Preview"
        className="h-full w-full bg-white"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
