import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { PageTransition } from "@/components/foundry/PageTransition";
import { CursorTrail } from "@/components/foundry/CursorTrail";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink text-ivory px-6">
      <div className="max-w-md text-center">
        <div
          className="font-display text-[120px] leading-none text-ivory/10 select-none"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="mt-4 font-display text-4xl text-[#f2edff]">Page not found.</h1>
        <p className="mt-4 text-sm leading-relaxed text-ivory/60">
          The page you're looking for doesn't exist or has been moved. Every idea starts somewhere —
          let's take you back to the foundry.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full bg-ivory px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-[#e7d9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
          >
            Return to the Foundry
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink text-ivory px-6">
      <div className="max-w-md text-center">
        <div
          className="font-display text-[120px] leading-none text-ivory/10 select-none"
          aria-hidden="true"
        >
          500
        </div>
        <h1 className="mt-4 font-display text-4xl text-[#f2edff]">Something went wrong.</h1>
        <p className="mt-4 text-sm leading-relaxed text-ivory/60">
          Something went wrong on our end. You can try again or head back to the foundry.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-3 rounded-full bg-ivory px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-[#e7d9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-ivory/20 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:border-ivory hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CursorTrail />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </QueryClientProvider>
  );
}
