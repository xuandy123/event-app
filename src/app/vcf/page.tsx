'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger the download
    const link = document.createElement('a');
    link.href = '/dibs.vcf';
    link.download = 'dibs.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect after short delay
    setTimeout(() => {
      router.push('/');
    }, 1000); // Adjust delay if needed (ms)
  }, [router]);

  return <p>Downloading contact card...</p>;
}
