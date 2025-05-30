import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PostFeatured } from "@/components/PostFeatured";
import { PostsList } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

// page.tsx(server) -> menu.tsx(server) -> link(client)

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer className="text-6xl font-bold text-center py-8">Footer</footer>
    </Container>
  );
}
