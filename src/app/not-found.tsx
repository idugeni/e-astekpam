import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl mt-4">Halaman tidak ditemukan.</p>
      <p className="text-md mt-2 text-muted-foreground">Maaf, kami tidak dapat menemukan halaman yang Anda cari.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition duration-200">
        Kembali ke Beranda
      </Link>
    </div>
  );
}