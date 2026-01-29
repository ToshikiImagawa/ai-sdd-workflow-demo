import {useState} from 'react';

type Props = {
    src: string;
    width: number;
    height: number;
    alt?: string;
    className?: string;
};

export function FallbackImage({src, width, height, alt = '', className}: Props) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    if (status === 'error') {
        return (
            <div
                className={`fallback-placeholder ${className ?? ''}`}
                style={{width, height}}
            >
                {width}px &times; {height}px
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{
                width,
                height,
                objectFit: 'contain',
                display: status === 'loading' ? 'none' : undefined,
            }}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
        />
    );
}
